<!-- begin::User Panel-->
<div id="kt_quick_user" class="offcanvas offcanvas-right p-10">
	<!--begin::Header-->
	<div class="offcanvas-header d-flex align-items-center justify-content-between pb-5">
		<h3 class="font-weight-bold m-0">Perfil do usuário</h3>
		<a href="#" class="btn btn-xs btn-icon btn-light btn-hover-primary" id="kt_quick_user_close">
			<i class="ki ki-close icon-xs text-muted"></i>
		</a>
	</div>
	<!--end::Header-->
	<!--begin::Content-->
	<div class="offcanvas-content pr-5 mr-n5">
		<!--begin::Header-->
		<div class="d-flex align-items-center mt-5">
			<div class="image-input image-input-outline" id="kt_profile_avatar" style="background-image: url(<?php if(isset($Foto) && $Foto != ""){ echo 'data:image;base64,'.base64_encode($Foto); }else{ echo '/Noteflix/Content/img/sem-foto.png'; } ?>)">
				<div class="image-input-wrapper border border-dark" style="border-width:2px !important;"></div>
				<label class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="change" data-toggle="tooltip" title="" data-original-title="Alterar">
					<i class="fa fa-edit icon-md text-muted"></i>
					<input type="file" name="profile_avatar" accept=".png, .jpg, .jpeg" />
					<input type="hidden" name="profile_avatar_remove" />
					<input type="hidden" class="d-none" id="HdnNovaFoto" />
					<input type="hidden" class="d-none" id="HdnVelhaFoto" value="<?php if(isset($Foto) && $Foto != ""){ echo 'data:image;base64,'.base64_encode($Foto); }else{ echo ''; } ?>" />
					<input type="hidden" class="d-none" id="HdnIdUsuario" value="<?php if(isset($Id)){ echo $Id; }else{ echo ''; } ?>">
				</label>
				<span class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="cancel" data-toggle="tooltip" title="Voltar">
					<i class="ki ki-bold-close icon-xs text-muted"></i>
				</span>
				<span class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="remove" data-toggle="tooltip" title="Excluir">
					<i class="ki ki-bold-close icon-xs text-muted"></i>
				</span>
			</div>
			<div class="d-flex flex-column ml-2">
				<a href="javascript:;" class="font-weight-bold font-size-h5 text-dark-75 text-hover-primary"><?php echo $Nome; ?></a>
				<div class="navi mt-2">
					<a href="javascript:;" class="navi-item">
						<span class="navi-link p-0 pb-2">
							<span class="navi-icon mr-1">
								<span class="svg-icon svg-icon-lg svg-icon-primary">
									<!--begin::Svg Icon | path:Metronic/demo2/dist/assets/media/svg/icons/Communication/Mail-notification.svg-->
									<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
										<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
											<rect x="0" y="0" width="24" height="24" />
											<path d="M21,12.0829584 C20.6747915,12.0283988 20.3407122,12 20,12 C16.6862915,12 14,14.6862915 14,18 C14,18.3407122 14.0283988,18.6747915 14.0829584,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,8 C3,6.8954305 3.8954305,6 5,6 L19,6 C20.1045695,6 21,6.8954305 21,8 L21,12.0829584 Z M18.1444251,7.83964668 L12,11.1481833 L5.85557487,7.83964668 C5.4908718,7.6432681 5.03602525,7.77972206 4.83964668,8.14442513 C4.6432681,8.5091282 4.77972206,8.96397475 5.14442513,9.16035332 L11.6444251,12.6603533 C11.8664074,12.7798822 12.1335926,12.7798822 12.3555749,12.6603533 L18.8555749,9.16035332 C19.2202779,8.96397475 19.3567319,8.5091282 19.1603533,8.14442513 C18.9639747,7.77972206 18.5091282,7.6432681 18.1444251,7.83964668 Z" fill="#000000" />
											<circle fill="#000000" opacity="0.3" cx="19.5" cy="17.5" r="2.5" />
										</g>
									</svg>
									<!--end::Svg Icon-->
								</span>
							</span>
							<span class="navi-text text-muted text-hover-primary"><?php echo $Email; ?></span>
						</span>
					</a>
					<a href="/Noteflix/Usuario/Sair" class="btn btn-sm btn-light-danger font-weight-bolder py-2 px-5">Sair</a>
				</div>
			</div>
		</div>
		<!--end::Header-->
		
	</div>
	<!--end::Content-->
</div>
<!-- end::User Panel-->

<script src="/Noteflix/Scripts/Home/Foto.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        FotoAPI.init();
    });
</script>