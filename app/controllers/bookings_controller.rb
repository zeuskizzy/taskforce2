class BookingsController < InheritedResources::Base

  private

    def booking_params
      params.require(:booking).permit(:title, :first_name, :last_name, :address, :rentalproduct_id, :status, :user_id, :email, :phone, :desc)
    end

end
