ActiveAdmin.register Rentalproduct do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :title, :sub_title, :desc, :body, :slug, :rental_id,
   :price, :discount, :rpimg, :location_id, :service_id
  #
  # or
  #
  # permit_params do
  #   permitted = [:title, :sub_title, :desc, :body, :slug, :rental_id, :price, :discount, :rpimg, :location_id, :service_id]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  form(:html => { :multipart => true }) do |f|
    f.inputs do
      f.input :rental_id, :label => 'Rental', :as => :select, :collection => Rental.all.map{|u| ["#{u.title}", u.id]}
      f.input :rpimg, as: :file

      f.input :title, placeholder: "title"
      f.input :price, placeholder: "Price Cost"
      f.input :desc, placeholder: "daily/weekly/monthly"
      f.input :discount
      f.input :body,  as: :quill_editor
    end
    f.actions
  end

  controller do
         def find_resource
           scoped_collection.friendly.find(params[:id])
         end
       end
end
