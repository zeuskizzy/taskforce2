require "application_system_test_case"

class RentalproductsTest < ApplicationSystemTestCase
  setup do
    @rentalproduct = rentalproducts(:one)
  end

  test "visiting the index" do
    visit rentalproducts_url
    assert_selector "h1", text: "Rentalproducts"
  end

  test "creating a Rentalproduct" do
    visit rentalproducts_url
    click_on "New Rentalproduct"

    fill_in "Body", with: @rentalproduct.body
    fill_in "Desc", with: @rentalproduct.desc
    fill_in "Discount", with: @rentalproduct.discount
    fill_in "Location", with: @rentalproduct.location_id
    fill_in "Price", with: @rentalproduct.price
    fill_in "Rental", with: @rentalproduct.rental_id
    fill_in "Service", with: @rentalproduct.service_id
    fill_in "Slug", with: @rentalproduct.slug
    fill_in "Sub title", with: @rentalproduct.sub_title
    fill_in "Title", with: @rentalproduct.title
    click_on "Create Rentalproduct"

    assert_text "Rentalproduct was successfully created"
    click_on "Back"
  end

  test "updating a Rentalproduct" do
    visit rentalproducts_url
    click_on "Edit", match: :first

    fill_in "Body", with: @rentalproduct.body
    fill_in "Desc", with: @rentalproduct.desc
    fill_in "Discount", with: @rentalproduct.discount
    fill_in "Location", with: @rentalproduct.location_id
    fill_in "Price", with: @rentalproduct.price
    fill_in "Rental", with: @rentalproduct.rental_id
    fill_in "Service", with: @rentalproduct.service_id
    fill_in "Slug", with: @rentalproduct.slug
    fill_in "Sub title", with: @rentalproduct.sub_title
    fill_in "Title", with: @rentalproduct.title
    click_on "Update Rentalproduct"

    assert_text "Rentalproduct was successfully updated"
    click_on "Back"
  end

  test "destroying a Rentalproduct" do
    visit rentalproducts_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Rentalproduct was successfully destroyed"
  end
end
