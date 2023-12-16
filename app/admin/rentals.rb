ActiveAdmin.register Rental do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :title, :sub_title, :optionclass, :address, :slug, :rentalimg, :rentalheaderimg, :body
  #
  # or
  #
  # permit_params do
  #   permitted = [:title, :sub_title, :address, :slug, :rentalimg, :rentalheaderimg, :body]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  form(:html => { :multipart => true }) do |f|
     f.inputs do
      f.input :title
      f.input :optionclass
      f.input :address, placeholder: "Address"
      f.input :rentalimg, :as => :file
      f.input :rentalheaderimg, :as => :file

      f.input :sub_title, placeholder: "description"
      f.input :body, as: :quill_editor
    end
    f.actions
  end

  controller do
         def find_resource
           scoped_collection.friendly.find(params[:id])
         end
       end
end
