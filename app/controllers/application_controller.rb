class ApplicationController < ActionController::Base
  add_flash_types :success, :danger, :info
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?
  layout :layout_by_resource


  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:account_update, keys:[:email, :password, :password_confirmation, :current_password, :username, :phone, :referal, :terms
      ])
    end
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys:[:email, :password, :password_confirmation, :current_password, :username, :phone, :referal, :terms ])
      end
      private
      def layout_by_resource
        if devise_controller? && resource_name == :user && action_name == 'new'
          "devise"
      elsif devise_controller? && resource_name == :user && action_name == 'edit'
        'devise'
      elsif devise_controller? && resource_name == :user
        'devise'
      else
        "application"
      end
    end
end
