ActiveAdmin.register Listingitem do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
   permit_params :iframelink, :mileage, :bodytype, :doors, :engine, :transmission, :drivetrain, :exteriorcolor, :interiorcolor, :condition, :feul, :title, :slug, :listingcat, :references, :carimg
  #
  # or
  #
  # permit_params do
  #   permitted = [:iframelink, :mileage, :bodytype, :doors, :engine, :transmission, :drivetrain, :exteriorcolor, :interiorcolor, :condition, :feul, :title, :slug, :listingcat, :references, :carimg]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

end
