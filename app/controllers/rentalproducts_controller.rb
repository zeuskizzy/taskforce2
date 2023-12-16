class RentalproductsController < InheritedResources::Base

  before_action :find_rentalproducts, only: [ :show, :edit, :update, :destroy]
  before_action :authenticate_adminuser!, except: [:index, :show]
  def index
    @rentalproducts = Rentalproduct.all.order('created_at ASC')

  end

  def show


  end

  private
  def find_rentals
    @rentalproduct = Rentalproduct.friendly.find(params[:id])
  end


    def rentalproduct_params
      params.require(:rentalproduct).permit(:title, :sub_title, :rpimg, :desc, :body, :slug, :rental_id, :price, :discount, :location_id, :service_id)
    end

end
