json.extract! review, :id, :title, :icon, :body, :slug, :created_at, :updated_at
json.url review_url(review, format: :json)
