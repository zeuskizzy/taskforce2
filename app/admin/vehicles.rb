ActiveAdmin.register Vehicle do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :l_first_name, :l_last_name, :l_address, :l_email, :v_name, :v_type, :v_plate_number, :v_info, :l_phone, :status, :slug, :user_id
  #
  # or
  #
  # permit_params do
  #   permitted = [:l_first_name, :l_last_name, :l_address, :l_email, :v_name, :v_type, :v_plate_number, :v_info, :l_phone, :slug, :user_id]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

end
