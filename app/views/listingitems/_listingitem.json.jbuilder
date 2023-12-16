json.extract! listingitem, :id, :iframelink, :mileage, :bodytype, :doors, :engine, :transmission, :drivetrain, :exteriorcolor, :interiorcolor, :condition, :feul, :title, :slug, :listingcat, :references, :created_at, :updated_at
json.url listingitem_url(listingitem, format: :json)
