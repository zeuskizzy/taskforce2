require "application_system_test_case"

class CarepacksTest < ApplicationSystemTestCase
  setup do
    @carepack = carepacks(:one)
  end

  test "visiting the index" do
    visit carepacks_url
    assert_selector "h1", text: "Carepacks"
  end

  test "creating a Carepack" do
    visit carepacks_url
    click_on "New Carepack"

    fill_in "Date", with: @carepack.date
    fill_in "Duration", with: @carepack.duration
    fill_in "Email", with: @carepack.email
    fill_in "Leave package", with: @carepack.leave_package
    fill_in "Message", with: @carepack.message
    fill_in "Military", with: @carepack.military_id
    fill_in "Name", with: @carepack.name
    fill_in "Phone", with: @carepack.phone
    fill_in "Price", with: @carepack.price
    fill_in "Slug", with: @carepack.slug
    check "Status" if @carepack.status
    fill_in "User", with: @carepack.user_id
    check "Verified" if @carepack.verified
    click_on "Create Carepack"

    assert_text "Carepack was successfully created"
    click_on "Back"
  end

  test "updating a Carepack" do
    visit carepacks_url
    click_on "Edit", match: :first

    fill_in "Date", with: @carepack.date
    fill_in "Duration", with: @carepack.duration
    fill_in "Email", with: @carepack.email
    fill_in "Leave package", with: @carepack.leave_package
    fill_in "Message", with: @carepack.message
    fill_in "Military", with: @carepack.military_id
    fill_in "Name", with: @carepack.name
    fill_in "Phone", with: @carepack.phone
    fill_in "Price", with: @carepack.price
    fill_in "Slug", with: @carepack.slug
    check "Status" if @carepack.status
    fill_in "User", with: @carepack.user_id
    check "Verified" if @carepack.verified
    click_on "Update Carepack"

    assert_text "Carepack was successfully updated"
    click_on "Back"
  end

  test "destroying a Carepack" do
    visit carepacks_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Carepack was successfully destroyed"
  end
end
