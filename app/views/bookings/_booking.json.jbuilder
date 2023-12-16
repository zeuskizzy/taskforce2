json.extract! booking, :id, :title, :first_name, :last_name, :address, :rentalproduct_id, :status, :user_id, :email, :phone, :desc, :created_at, :updated_at
json.url booking_url(booking, format: :json)
