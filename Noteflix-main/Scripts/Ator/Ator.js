"use strict";

var AtorAPI = function() {

    var urlSalvar = "/Noteflix/Ator/Salvar/";
    var urlSalvarAlteracao = "/Noteflix/Ator/SalvarAlteracao/";
    var urlVisualizar = "/Noteflix/Ator/Visualizar/";
    var urlAlterar = "/Noteflix/Ator/Alterar/";
    var urlExcluir = "/Noteflix/Ator/Excluir/";
    var urlSuccess = "/Noteflix/Ator/Index/";
    var urlFileCallback = "/Noteflix/Home/FileCallback/";
    var urlBuscarFoto = "/Noteflix/Ator/BuscarFoto/";

    var validation = null;
    var ObjDropzone = null;

    var table = function () {

        $('#kt_datatable').KTDatatable({

            data: {
                saveState: { cookie: false },
                pageSize: 10                
            },

            rows: {
                autoHide: false,                
            },

            search: {
                input: $('#kt_datatable_search_query'),
                key: 'generalSearch'
            },

            toolbar: {
                layout: ['info', 'pagination']
            },

            layout: {
                class: 'tabela-noteflix'
            },
           
            columns: [
                {
                    field: 'id',
                    textAlign: 'center',
                    sortable: false,
                    width: 150,
                    type: 'number',
                    selector: false,

                }, {
                    field: 'nome',
                    textAlign: 'center',
                    width: 180

                }, {
                    field: 'action',
                    textAlign: 'center',
                    sortable: false,
                    overflow: 'visible',
                    autoHide: false,
                    width: 100                    

                }
            ],

            translate: _datatablesTranslate,

        });
        
        $('#kt_datatable').removeClass('d-none');

    };

    var OnClickVisualizar = function () {
        $('#kt_datatable').on('click', '.view', function () {
            var idElement = $(this).data('id');
            window.location.href = urlVisualizar + idElement;
        });
    }

    var OnClickAlterar = function () {
        $('#kt_datatable').on('click', '.edit', function () {
            var idElement = $(this).data('id');
            window.location.href = urlAlterar + idElement;
        });
    };

    var OnClickExcluir = function () {
        $('#kt_datatable').on('click', '.delete', function () {

            var idElement = $(this).data('id');

            swal.fire({
                title: "Você tem certeza?",
                text: "Realmente deseja excluir esse ator?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sim",
                cancelButtonText: "Não",
                customClass: {
                    confirmButton: "btn font-weight-bold btn-danger",
                    cancelButton: "btn font-weight-bold btn-light"
                }
            }).then(function(result) {
                if(result.value){
            
                    KTApp.blockPage({
                        overlayColor: '#000000',
                        state: 'info', // a bootstrap color
                        message: 'Aguarde...'
                    });					
    
                    $.ajax({
                        url: urlExcluir,
                        type: 'POST',
                        dataType: "html",
                        data: {"id":idElement},
                        success: function (json) {
    
                            var data = JSON.parse(json);
    
                            KTApp.unblockPage();

                            swal.fire({
                                title: data.MessageTitle,
                                text: data.Message,
                                icon: data.Ok ? "success" : "error",
                                confirmButtonText: "Ok",
                                customClass: {
                                    confirmButton: "btn font-weight-bold btn-light-primary"
                                }
                            }).then(function() {

                                if(data.Ok){							
                                    window.location.href = urlSuccess;
                                }
                                else{        
                                    
                                    
                                }

                            });  
        
                        },
                        error: function () {

                            KTApp.unblockPage();
        
                            swal.fire({
                                title: "Aviso",
                                text: "Desculpe, houve um erro na requisição!",
                                icon: "error",
                                confirmButtonText: "Ok",
                                customClass: {
                                    confirmButton: "btn font-weight-bold btn-light-primary"
                                }
                            }).then(function() {
                                KTUtil.scrollTop();
                            });
            
                        }
                    });
                            
                       
    
                }
    
            });
            
        });
    };
    
    var Validar = function(){

        validation = FormValidation.formValidation(
			KTUtil.getById('Form'),
			{
				fields: {
					AtorNome: {
						validators: {
							notEmpty: {
								message: 'O nome do ator é obrigatório!'
							},
						},
					},
				},
				plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                    //defaultSubmit: new FormValidation.plugins.DefaultSubmit(), // Uncomment this line to enable normal button submit after form validation
					bootstrap: new FormValidation.plugins.Bootstrap()
				}
			}
		);

    }

    var UploadFoto = (blockClick) => {

        KTApp.blockPage({
            overlayColor: '#000000',
            state: 'info', // a bootstrap color
            message: 'Aguarde...'
        }); 
        
        var idElement = $('#IdElement').val();

        $.ajax({
            url: urlBuscarFoto,
            type: 'POST',
            dataType: "html",
            data: {"idElement":idElement},
            success: function (json) {

                var data = JSON.parse(json);

                KTApp.unblockPage();

                if (data.Result.url != null) {

                    localStorage.removeItem('base64Foto');
                    localStorage.setItem('base64Foto', data.Result.url.replace(/^data:image\/[a-z]+;base64,/, ""))
                    InitDropzone(data.Result, blockClick);

                } else {
                    InitDropzone("", blockClick);
                }

            },
            error: function () {

                KTApp.unblockPage();

                swal.fire({
                    title: "Aviso",
                    text: "Desculpe, houve um erro na requisição!",
                    icon: "error",
                    confirmButtonText: "Ok",
                    customClass: {
                        confirmButton: "btn font-weight-bold btn-light-primary"
                    }
                }).then(function() {
                    KTUtil.scrollTop();
                });

            }
        });

    }

    var InitDropzone = (preloadFile, blockClick) => {

        ObjDropzone = $('.drop-zone').dropzone({
            url: urlFileCallback,
            paramName: "file", // The name that will be used to transfer the file
            maxFiles: 1,
            maxFilesize: 5, // MB
            thumbnailWidth: 310,
            thumbnailHeight: 420,
            addRemoveLinks: true,
            acceptedFiles: ".jpg,.jpeg",
            init: function () {
                this.on("addedfile", function (file) {                    

                    if (file.size > 1000000) {
                        return;
                    }

                    if (this.files[1] != null) {
                        this.removeFile(this.files[0]);
                    }

                    if (this.files[0] && $.inArray(this.files[0].type, ['image/jpeg', 'image/jpg', 'image/png']) == -1) {
                        return;
                    }

                    if (this.files[1] != null) {
                        this.removeFile(this.files[0]);
                    }
                    else if (this.files[0] instanceof Blob) {
                        var reader = new FileReader();
                        reader.onload = function (event) {
                            var base64String = event.target.result;
                            
                            localStorage.removeItem('base64Foto');
                            localStorage.setItem('base64Foto', base64String.replace(/^data:image\/[a-z]+;base64,/, ""))
                        };
                        reader.readAsDataURL(this.files[0]);

                    }                    

                });
                this.on("complete", function (file) {

                    if (!blockClick) {
                        $(".dz-remove").html("<div><span class='text-danger font-size-h6'>Remover</span></div>");
                    }
                    else {
                        $(".dz-remove").remove();
                    }
                    

                    ObjDropzone = this;


                });

                if (preloadFile) {
                    var mockFile = { name: preloadFile.name, size: preloadFile.size, type: 'image/jpg', dataUrl: " data:image/jpg;charset=utf-8;base64, " + preloadFile.url };
                    this.files.push(mockFile);
                    this.displayExistingFile(mockFile, " data:image/jpg;charset=utf-8;base64, " + preloadFile.url);
                }

                if (blockClick) {
                    this.disable();
                }

                this.on("error", function (file) {
                    this.removeFile(file);
                    localStorage.removeItem('base64Foto');
                });

            },
            addedFile: (file) => {
                console.log(file);
            },
            accept: function (file, done) {
                done();
            },
            error: (file, message, xhr) => {

                var erro = message;

                if (message == "You can't upload files of this type.") {
                    erro = "Esse tipo de arquivo não é permitido!";
                }
                
                if (message.substring(0, 15) == "File is too big") {
                    erro = "O tamanho máximo é de 1 MB!";
                }

                Swal.fire({
                    text: erro,
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok",
                    customClass: {
                        confirmButton: "btn font-weight-bold btn-light"
                    }
                })

            }
        });

    }

    var Salvar = function(){

        $('#Salvar').on('click', function(){

            swal.fire({
                title: "Você tem certeza?",
                text: "Realmente deseja salvar esse ator?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sim",
                cancelButtonText: "Não",
                customClass: {
                    confirmButton: "btn font-weight-bold btn-primary",
                    cancelButton: "btn font-weight-bold btn-light"
                }
            }).then(function(result) {
                if(result.value){
    
                    validation.validate().then(function(status) {
                        if (status == 'Valid') {
            
                            KTApp.blockPage({
                                overlayColor: '#000000',
                                state: 'info', // a bootstrap color
                                message: 'Aguarde...'
                            });
                            
                            var atorNome = $('#AtorNome').val();
                            var atorFoto = localStorage.getItem('base64Foto');

                            if(atorFoto == null){
                                atorFoto = "";
                            }
            
                            $.ajax({
                                url: urlSalvar,
                                type: 'POST',
                                dataType: "html",
                                data: {"atorNome":atorNome, "atorFoto":atorFoto},
                                success: function (json) {
            
                                    var data = JSON.parse(json);
            
                                    KTApp.unblockPage();
    
                                    swal.fire({
                                        title: data.MessageTitle,
                                        text: data.Message,
                                        icon: data.Ok ? "success" : "error",
                                        confirmButtonText: "Ok",
                                        customClass: {
                                            confirmButton: "btn font-weight-bold btn-light-primary"
                                        }
                                    }).then(function() {
    
                                        if(data.Ok){
                                            localStorage.removeItem('base64Foto');							
                                            window.location.href = urlSuccess;
                                        }
                                        else{        
                                            
                                            
                                        }
    
                                    });  
                
                                },
                                error: function () {

                                    KTApp.unblockPage();
                
                                    swal.fire({
                                        title: "Aviso",
                                        text: "Desculpe, houve um erro na requisição!",
                                        icon: "error",
                                        confirmButtonText: "Ok",
                                        customClass: {
                                            confirmButton: "btn font-weight-bold btn-light-primary"
                                        }
                                    }).then(function() {
                                        KTUtil.scrollTop();
                                    });
                    
                                }
                            });
                            
                        } else {
                            swal.fire({
                                title: "Aviso",
                                text: "Você deve preencher todos os campos obrigatórios!",
                                icon: "error",
                                confirmButtonText: "Ok",
                                customClass: {
                                    confirmButton: "btn font-weight-bold btn-light-primary"
                                }
                            }).then(function() {
                                KTUtil.scrollTop();
                            });
                        }
                    });
    
                }
    
            });

        });

    }

    var OnClickSalvarAlteracao = function(){

        $('#Salvar').on('click', function(){

            swal.fire({
                title: "Você tem certeza?",
                text: "Realmente deseja alterar esse ator?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sim",
                cancelButtonText: "Não",
                customClass: {
                    confirmButton: "btn font-weight-bold btn-primary",
                    cancelButton: "btn font-weight-bold btn-light"
                }
            }).then(function(result) {
                if(result.value){
    
                    validation.validate().then(function(status) {
                        if (status == 'Valid') {
            
                            KTApp.blockPage({
                                overlayColor: '#000000',
                                state: 'info', // a bootstrap color
                                message: 'Aguarde...'
                            });
                            
                            var atorId = $('#IdElement').val();
                            var atorNome = $('#AtorNome').val();
                            var atorFoto = localStorage.getItem('base64Foto');
            
                            $.ajax({
                                url: urlSalvarAlteracao,
                                type: 'POST',
                                dataType: "html",
                                data: {"atorId":atorId, "atorNome":atorNome, "atorFoto":atorFoto},
                                success: function (json) {
            
                                    var data = JSON.parse(json);
            
                                    KTApp.unblockPage();
    
                                    swal.fire({
                                        title: data.MessageTitle,
                                        text: data.Message,
                                        icon: data.Ok ? "success" : "error",
                                        confirmButtonText: "Ok",
                                        customClass: {
                                            confirmButton: "btn font-weight-bold btn-light-primary"
                                        }
                                    }).then(function() {
    
                                        if(data.Ok){							
                                            window.location.href = urlSuccess;
                                        }
                                        else{        
                                            
                                            
                                        }
    
                                    });  
                
                                },
                                error: function () {

                                    KTApp.unblockPage();
                
                                    swal.fire({
                                        title: "Aviso",
                                        text: "Desculpe, houve um erro na requisição!",
                                        icon: "error",
                                        confirmButtonText: "Ok",
                                        customClass: {
                                            confirmButton: "btn font-weight-bold btn-light-primary"
                                        }
                                    }).then(function() {
                                        KTUtil.scrollTop();
                                    });
                    
                                }
                            });
                            
                        } else {
                            swal.fire({
                                title: "Aviso",
                                text: "Você deve preencher todos os campos obrigatórios!",
                                icon: "error",
                                confirmButtonText: "Ok",
                                customClass: {
                                    confirmButton: "btn font-weight-bold btn-light-primary"
                                }
                            }).then(function() {
                                KTUtil.scrollTop();
                            });
                        }
                    });
    
                }
    
            });

        });

    }

    
    return {
        
        initIndex: function() {
            
            table();
            OnClickVisualizar();
            OnClickAlterar();
            OnClickExcluir();

        },
        initCadastrar: function() {

            localStorage.removeItem('base64Foto');
            InitDropzone();
            Validar();
            Salvar();
            
        },
        initAlterar: function() {

            localStorage.removeItem('base64Foto');
            UploadFoto();
            Validar();
            OnClickSalvarAlteracao();
            
        },
        initVisualizar: function() {
            
            localStorage.removeItem('base64Foto');
            UploadFoto(true);

        }

    };
}();
