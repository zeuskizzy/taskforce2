ActiveAdmin.register LuxListingitem do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
   permit_params :luximg, :iframelink, :mileage, :bodytype, :doors,
    :engine, :transmission, :drivetrain, :exteriorcolor,
     :interiorcolor, :condition, :feul,
    :title, :slug, :listingcat, :references, :luximg2
  #
  # or
  #
  # permit_params do
  #   permitted = [:luximg, :iframelink, :mileage, :bodytype, :doors, :engine, :transmission, :drivetrain, :exteriorcolor, :interiorcolor, :condition, :feul, :title, :slug, :listingcat, :references]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  form(:html => { :multipart => true }) do |f|
     f.inputs do
      f.input :title

      f.input :luximg, :as => :file
      f.input :luximg2, :as => :file

      f.input :references, placeholder: "optionclass"

    
    end
    f.actions
  end

  controller do
         def find_resource
           scoped_collection.friendly.find(params[:id])
         end
       end

end
