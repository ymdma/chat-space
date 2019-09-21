class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?


  protected

  def configure_permitted_parameters#追加のパラメーターを許可
    #deviseで設定されているstrong_parametersに対してパラメーターを追加する
    #.permit(ストロングパラメーターを追加するアクション, keys: [追加したいキー])
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end
end