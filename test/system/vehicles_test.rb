require "application_system_test_case"

class VehiclesTest < ApplicationSystemTestCase
  setup do
    @vehicle = vehicles(:one)
  end

  test "visiting the index" do
    visit vehicles_url
    assert_selector "h1", text: "Vehicles"
  end

  test "creating a Vehicle" do
    visit vehicles_url
    click_on "New Vehicle"

    fill_in "L address", with: @vehicle.l_address
    fill_in "L email", with: @vehicle.l_email
    fill_in "L first name", with: @vehicle.l_first_name
    fill_in "L last name", with: @vehicle.l_last_name
    fill_in "L phone", with: @vehicle.l_phone
    fill_in "Slug", with: @vehicle.slug
    fill_in "User", with: @vehicle.user_id
    fill_in "V info", with: @vehicle.v_info
    fill_in "V name", with: @vehicle.v_name
    fill_in "V plate number", with: @vehicle.v_plate_number
    fill_in "V type", with: @vehicle.v_type
    click_on "Create Vehicle"

    assert_text "Vehicle was successfully created"
    click_on "Back"
  end

  test "updating a Vehicle" do
    visit vehicles_url
    click_on "Edit", match: :first

    fill_in "L address", with: @vehicle.l_address
    fill_in "L email", with: @vehicle.l_email
    fill_in "L first name", with: @vehicle.l_first_name
    fill_in "L last name", with: @vehicle.l_last_name
    fill_in "L phone", with: @vehicle.l_phone
    fill_in "Slug", with: @vehicle.slug
    fill_in "User", with: @vehicle.user_id
    fill_in "V info", with: @vehicle.v_info
    fill_in "V name", with: @vehicle.v_name
    fill_in "V plate number", with: @vehicle.v_plate_number
    fill_in "V type", with: @vehicle.v_type
    click_on "Update Vehicle"

    assert_text "Vehicle was successfully updated"
    click_on "Back"
  end

  test "destroying a Vehicle" do
    visit vehicles_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Vehicle was successfully destroyed"
  end
end
