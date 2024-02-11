# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2024_02_10_173046) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "abouts", force: :cascade do |t|
    t.string "title"
    t.string "sub_title"
    t.string "body"
    t.string "abtimg"
    t.string "slug"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["slug"], name: "index_abouts_on_slug"
  end

  create_table "accounts", force: :cascade do |t|
    t.string "account_number"
    t.boolean "status"
    t.string "slug"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "email"
    t.string "phone"
    t.index ["slug"], name: "index_accounts_on_slug"
    t.index ["user_id"], name: "index_accounts_on_user_id"
  end

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource"
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "banners", force: :cascade do |t|
    t.string "title"
    t.string "sub_title"
    t.string "bannerimg"
    t.string "slug"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["slug"], name: "index_banners_on_slug"
  end

  create_table "blogs", force: :cascade do |t|
    t.string "title"
    t.string "sub_title"
    t.text "body"
    t.string "blogimg"
    t.string "videolink"
    t.string "blogvideoimg"
    t.string "slug"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["slug"], name: "index_blogs_on_slug"
  end

  create_table "boards", force: :cascade do |t|
    t.string "title"
    t.string "name"
    t.text "body"
    t.string "boardimg"
    t.string "slug"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["slug"], name: "index_boards_on_slug"
  end

  create_table "bookings", force: :cascade do |t|
    t.string "title"
    t.string "first_name"
    t.string "last_name"
    t.string "address"
    t.integer "rentalproduct_id"
    t.boolean "status"
    t.bigint "user_id", null: false
    t.string "email"
    t.string "phone"
    t.string "desc"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_bookings_on_user_id"
  end

  create_table "carepacks", force: :cascade do |t|
    t.string "leave_package"
    t.string "name"
    t.string "email"
    t.string "phone"
    t.string "military_id"
    t.boolean "status"
    t.boolean "verified"
    t.string "slug"
    t.string "message"
    t.datetime "date"
    t.string "price"
    t.string "duration"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["slug"], name: "index_carepacks_on_slug"
    t.index ["user_id"], name: "index_carepacks_on_user_id"
  end

  create_table "contacts", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "phone"
    t.text "body"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "csections", force: :cascade do |t|
    t.string "title"
    t.string "sub_title"
    t.string "body"
    t.string "csecctionimg"
    t.string "slug"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "csectionimg"
    t.index ["slug"], name: "index_csections_on_slug"
  end

  create_table "faqs", force: :cascade do |t|
    t.string "title"
    t.string "sub_title"
    t.string "body"
    t.string "slug"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["slug"], name: "index_faqs_on_slug"
  end

  create_table "features", force: :cascade do |t|
    t.string "fimg"
    t.string "title"
    t.string "sub_title"
    t.string "body"
    t.string "slug"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["slug"], name: "index_features_on_slug"
  end

  create_table "headers", force: :cascade do |t|
    t.string "abouts_title"
    t.string "abouts_sub_title"
    t.string "services_title"
    t.string "services_sub_title"
    t.string "boards_title"
    t.string "boards_sub_title"
    t.string "features_title"
    t.string "features_sub_title"
    t.string "feedbacks_title"
    t.string "feedbacks_sub_title"
    t.string "blogs_title"
    t.string "blogs_sub_title"
    t.string "projects_title"
    t.string "projects_sub_title"
    t.string "cta1"
    t.string "cta2"
    t.string "headerimg"
    t.string "products_title"
    t.string "products_sub_title"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "abouts_videolink"
    t.string "abtsectionimg"
    t.string "headertitle"
    t.string "headersub_title"
    t.string "services_videolink"
    t.string "events_title"
    t.string "events_sub_title"
    t.string "company_title"
    t.string "company_sub_title"
    t.string "plans_title"
    t.string "plans_sub_title"
    t.string "plans_desc"
    t.string "admin_title"
    t.string "admin_sub_title"
    t.string "adminlogoimg"
    t.text "tc"
    t.string "headertext"
    t.string "headersubtext"
  end

  create_table "listingcats", force: :cascade do |t|
    t.string "title"
    t.boolean "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "catcarimg"
    t.string "iframelink"
    t.string "slug"
    t.index ["slug"], name: "index_listingcats_on_slug"
  end

  create_table "listingitems", force: :cascade do |t|
    t.string "iframelink"
    t.string "mileage"
    t.string "bodytype"
    t.string "doors"
    t.string "engine"
    t.string "transmission"
    t.string "drivetrain"
    t.string "exteriorcolor"
    t.string "interiorcolor"
    t.string "condition"
    t.string "feul"
    t.string "title"
    t.string "slug"
    t.string "listingcat"
    t.string "references"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "carimg"
    t.index ["slug"], name: "index_listingitems_on_slug"
  end

  create_table "locations", force: :cascade do |t|
    t.string "title"
    t.string "sub_title"
    t.string "address"
    t.string "slug"
    t.string "locationimg"
    t.string "gps"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["slug"], name: "index_locations_on_slug"
  end

  create_table "lux_listingitems", force: :cascade do |t|
    t.string "luximg"
    t.string "iframelink"
    t.string "mileage"
    t.string "bodytype"
    t.string "doors"
    t.string "engine"
    t.string "transmission"
    t.string "drivetrain"
    t.string "exteriorcolor"
    t.string "interiorcolor"
    t.string "condition"
    t.string "feul"
    t.string "title"
    t.string "slug"
    t.string "listingcat"
    t.string "references"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "luximg2"
    t.index ["slug"], name: "index_lux_listingitems_on_slug"
  end

  create_table "plans", force: :cascade do |t|
    t.string "amount"
    t.string "name"
    t.string "referal"
    t.string "duration"
    t.string "plan"
    t.string "plan_name"
    t.string "mini"
    t.string "maxi"
    t.string "body"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "rentalproducts", force: :cascade do |t|
    t.string "title"
    t.string "sub_title"
    t.string "desc"
    t.text "body"
    t.string "slug"
    t.integer "rental_id"
    t.string "price"
    t.string "discount"
    t.string "rpimg"
    t.integer "location_id"
    t.integer "service_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["slug"], name: "index_rentalproducts_on_slug"
  end

  create_table "rentals", force: :cascade do |t|
    t.string "title"
    t.string "sub_title"
    t.string "address"
    t.string "slug"
    t.string "rentalimg"
    t.string "rentalheaderimg"
    t.string "body"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "optionclass"
    t.index ["slug"], name: "index_rentals_on_slug"
  end

  create_table "reporepairs", force: :cascade do |t|
    t.string "v_name"
    t.string "v_type"
    t.string "v_info"
    t.string "v_model"
    t.boolean "status"
    t.bigint "user_id", null: false
    t.string "slug"
    t.string "pk_address"
    t.string "d_address"
    t.string "phone"
    t.string "vimg"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["slug"], name: "index_reporepairs_on_slug"
    t.index ["user_id"], name: "index_reporepairs_on_user_id"
  end

  create_table "reporescues", force: :cascade do |t|
    t.string "v_debt"
    t.datetime "repo_time"
    t.string "repo_plan"
    t.string "v_name"
    t.string "v_type"
    t.string "v_info"
    t.string "v_model"
    t.boolean "status"
    t.bigint "user_id", null: false
    t.string "slug"
    t.string "pk_address"
    t.string "d_address"
    t.string "phone"
    t.string "vrepoimg"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["slug"], name: "index_reporescues_on_slug"
    t.index ["user_id"], name: "index_reporescues_on_user_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.string "title"
    t.string "icon"
    t.string "body"
    t.string "slug"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "reviewimg"
    t.index ["slug"], name: "index_reviews_on_slug"
  end

  create_table "sections", force: :cascade do |t|
    t.string "title"
    t.string "icon"
    t.string "body"
    t.string "sub_title"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "secimg"
    t.bigint "service_id", null: false
    t.string "slug"
    t.integer "services"
    t.index ["service_id"], name: "index_sections_on_service_id"
    t.index ["slug"], name: "index_sections_on_slug"
  end

  create_table "services", force: :cascade do |t|
    t.string "title"
    t.string "slug"
    t.string "icon"
    t.string "sub_title"
    t.text "body"
    t.string "serviceimg"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["slug"], name: "index_services_on_slug"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "username"
    t.string "phone"
    t.string "referal"
    t.boolean "terms"
    t.string "slug"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["slug"], name: "index_users_on_slug"
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true
  end

  create_table "vehicles", force: :cascade do |t|
    t.string "l_first_name"
    t.string "l_last_name"
    t.string "l_address"
    t.string "l_email"
    t.string "v_name"
    t.string "v_type"
    t.string "v_plate_number"
    t.string "v_info"
    t.string "l_phone"
    t.string "slug"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "status"
    t.index ["slug"], name: "index_vehicles_on_slug"
    t.index ["user_id"], name: "index_vehicles_on_user_id"
  end

  create_table "welcomes", force: :cascade do |t|
    t.string "title"
    t.string "logoimg"
    t.string "desc"
    t.string "whatsapp"
    t.string "ig"
    t.string "ln"
    t.string "section"
    t.string "link"
    t.string "footer"
    t.string "phone"
    t.string "address"
    t.string "twitter"
    t.string "email"
    t.string "youtube"
    t.string "telegram"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "whitelogoimg"
  end

  add_foreign_key "accounts", "users"
  add_foreign_key "bookings", "users"
  add_foreign_key "carepacks", "users"
  add_foreign_key "reporepairs", "users"
  add_foreign_key "reporescues", "users"
  add_foreign_key "sections", "services"
  add_foreign_key "vehicles", "users"
end
