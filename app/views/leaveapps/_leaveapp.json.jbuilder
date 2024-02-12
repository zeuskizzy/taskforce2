json.extract! leaveapp, :id, :leave_package, :name, :email, :phone, :military_id, :status, :verified, :slug, :message, :date, :price, :duration, :user_id, :created_at, :updated_at
json.url leaveapp_url(leaveapp, format: :json)
