require "application_system_test_case"

class BookingsTest < ApplicationSystemTestCase
  setup do
    @booking = bookings(:one)
  end

  test "visiting the index" do
    visit bookings_url
    assert_selector "h1", text: "Bookings"
  end

  test "creating a Booking" do
    visit bookings_url
    click_on "New Booking"

    fill_in "Address", with: @booking.address
    fill_in "Desc", with: @booking.desc
    fill_in "Email", with: @booking.email
    fill_in "First name", with: @booking.first_name
    fill_in "Last name", with: @booking.last_name
    fill_in "Phone", with: @booking.phone
    fill_in "Rentalproduct", with: @booking.rentalproduct_id
    check "Status" if @booking.status
    fill_in "Title", with: @booking.title
    fill_in "User", with: @booking.user_id
    click_on "Create Booking"

    assert_text "Booking was successfully created"
    click_on "Back"
  end

  test "updating a Booking" do
    visit bookings_url
    click_on "Edit", match: :first

    fill_in "Address", with: @booking.address
    fill_in "Desc", with: @booking.desc
    fill_in "Email", with: @booking.email
    fill_in "First name", with: @booking.first_name
    fill_in "Last name", with: @booking.last_name
    fill_in "Phone", with: @booking.phone
    fill_in "Rentalproduct", with: @booking.rentalproduct_id
    check "Status" if @booking.status
    fill_in "Title", with: @booking.title
    fill_in "User", with: @booking.user_id
    click_on "Update Booking"

    assert_text "Booking was successfully updated"
    click_on "Back"
  end

  test "destroying a Booking" do
    visit bookings_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Booking was successfully destroyed"
  end
end
