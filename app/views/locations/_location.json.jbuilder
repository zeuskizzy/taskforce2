json.extract! location, :id, :title, :sub_title, :address, :slug, :created_at, :updated_at
json.url location_url(location, format: :json)
