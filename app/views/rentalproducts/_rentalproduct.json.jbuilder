json.extract! rentalproduct, :id, :title, :sub_title, :desc, :body, :slug, :rental_id, :price, :discount, :location_id, :service_id, :created_at, :updated_at
json.url rentalproduct_url(rentalproduct, format: :json)
