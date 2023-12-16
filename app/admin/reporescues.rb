ActiveAdmin.register Reporescue do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
   permit_params :v_debt, :repo_time, :repo_plan, :v_name, :v_type, :v_info, :v_model, :status, :user_id, :slug, :pk_address, :d_address, :phone, :vrepoimg
  #
  # or
  #
  # permit_params do
  #   permitted = [:v_debt, :repo_time, :repo_plan, :v_name, :v_type, :v_info, :v_model, :status, :user_id, :slug, :pk_address, :d_address, :phone, :vrepoimg]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

end
