require "application_system_test_case"

class LeaveappsTest < ApplicationSystemTestCase
  setup do
    @leaveapp = leaveapps(:one)
  end

  test "visiting the index" do
    visit leaveapps_url
    assert_selector "h1", text: "Leaveapps"
  end

  test "creating a Leaveapp" do
    visit leaveapps_url
    click_on "New Leaveapp"

    fill_in "Date", with: @leaveapp.date
    fill_in "Duration", with: @leaveapp.duration
    fill_in "Email", with: @leaveapp.email
    fill_in "Leave package", with: @leaveapp.leave_package
    fill_in "Message", with: @leaveapp.message
    fill_in "Military", with: @leaveapp.military_id
    fill_in "Name", with: @leaveapp.name
    fill_in "Phone", with: @leaveapp.phone
    fill_in "Price", with: @leaveapp.price
    fill_in "Slug", with: @leaveapp.slug
    check "Status" if @leaveapp.status
    fill_in "User", with: @leaveapp.user_id
    check "Verified" if @leaveapp.verified
    click_on "Create Leaveapp"

    assert_text "Leaveapp was successfully created"
    click_on "Back"
  end

  test "updating a Leaveapp" do
    visit leaveapps_url
    click_on "Edit", match: :first

    fill_in "Date", with: @leaveapp.date
    fill_in "Duration", with: @leaveapp.duration
    fill_in "Email", with: @leaveapp.email
    fill_in "Leave package", with: @leaveapp.leave_package
    fill_in "Message", with: @leaveapp.message
    fill_in "Military", with: @leaveapp.military_id
    fill_in "Name", with: @leaveapp.name
    fill_in "Phone", with: @leaveapp.phone
    fill_in "Price", with: @leaveapp.price
    fill_in "Slug", with: @leaveapp.slug
    check "Status" if @leaveapp.status
    fill_in "User", with: @leaveapp.user_id
    check "Verified" if @leaveapp.verified
    click_on "Update Leaveapp"

    assert_text "Leaveapp was successfully updated"
    click_on "Back"
  end

  test "destroying a Leaveapp" do
    visit leaveapps_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Leaveapp was successfully destroyed"
  end
end
