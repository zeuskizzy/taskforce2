class ListingitemsController < InheritedResources::Base

  private

    def listingitem_params
      params.require(:listingitem).permit(:iframelink, :mileage, :bodytype, :doors, :engine, :transmission, :drivetrain, :exteriorcolor, :interiorcolor, :condition, :feul, :title, :slug, :listingcat, :references)
    end

end
