require "application_system_test_case"

class CsectionsTest < ApplicationSystemTestCase
  setup do
    @csection = csections(:one)
  end

  test "visiting the index" do
    visit csections_url
    assert_selector "h1", text: "Csections"
  end

  test "creating a Csection" do
    visit csections_url
    click_on "New Csection"

    fill_in "Body", with: @csection.body
    fill_in "Csecctionimg", with: @csection.csecctionimg
    fill_in "Slug", with: @csection.slug
    fill_in "Sub title", with: @csection.sub_title
    fill_in "Title", with: @csection.title
    click_on "Create Csection"

    assert_text "Csection was successfully created"
    click_on "Back"
  end

  test "updating a Csection" do
    visit csections_url
    click_on "Edit", match: :first

    fill_in "Body", with: @csection.body
    fill_in "Csecctionimg", with: @csection.csecctionimg
    fill_in "Slug", with: @csection.slug
    fill_in "Sub title", with: @csection.sub_title
    fill_in "Title", with: @csection.title
    click_on "Update Csection"

    assert_text "Csection was successfully updated"
    click_on "Back"
  end

  test "destroying a Csection" do
    visit csections_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Csection was successfully destroyed"
  end
end
