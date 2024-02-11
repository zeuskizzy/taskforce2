class CarepacksController < InheritedResources::Base

  private

    def carepack_params
      params.require(:carepack).permit(:leave_package, :name, :email, :phone, :military_id, :status, :verified, :slug, :message, :date, :price, :duration, :user_id)
    end

end
