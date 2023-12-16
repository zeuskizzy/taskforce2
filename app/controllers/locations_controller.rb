class LocationsController < InheritedResources::Base

  private

    def location_params
      params.require(:location).permit(:title, :sub_title, :address, :slug)
    end

end
