require "application_system_test_case"

class LuxListingitemsTest < ApplicationSystemTestCase
  setup do
    @lux_listingitem = lux_listingitems(:one)
  end

  test "visiting the index" do
    visit lux_listingitems_url
    assert_selector "h1", text: "Lux Listingitems"
  end

  test "creating a Lux listingitem" do
    visit lux_listingitems_url
    click_on "New Lux Listingitem"

    fill_in "Bodytype", with: @lux_listingitem.bodytype
    fill_in "Condition", with: @lux_listingitem.condition
    fill_in "Doors", with: @lux_listingitem.doors
    fill_in "Drivetrain", with: @lux_listingitem.drivetrain
    fill_in "Engine", with: @lux_listingitem.engine
    fill_in "Exteriorcolor", with: @lux_listingitem.exteriorcolor
    fill_in "Feul", with: @lux_listingitem.feul
    fill_in "Iframelink", with: @lux_listingitem.iframelink
    fill_in "Interiorcolor", with: @lux_listingitem.interiorcolor
    fill_in "Listingcat", with: @lux_listingitem.listingcat
    fill_in "Luximg", with: @lux_listingitem.luximg
    fill_in "Mileage", with: @lux_listingitem.mileage
    fill_in "References", with: @lux_listingitem.references
    fill_in "Slug", with: @lux_listingitem.slug
    fill_in "Title", with: @lux_listingitem.title
    fill_in "Transmission", with: @lux_listingitem.transmission
    click_on "Create Lux listingitem"

    assert_text "Lux listingitem was successfully created"
    click_on "Back"
  end

  test "updating a Lux listingitem" do
    visit lux_listingitems_url
    click_on "Edit", match: :first

    fill_in "Bodytype", with: @lux_listingitem.bodytype
    fill_in "Condition", with: @lux_listingitem.condition
    fill_in "Doors", with: @lux_listingitem.doors
    fill_in "Drivetrain", with: @lux_listingitem.drivetrain
    fill_in "Engine", with: @lux_listingitem.engine
    fill_in "Exteriorcolor", with: @lux_listingitem.exteriorcolor
    fill_in "Feul", with: @lux_listingitem.feul
    fill_in "Iframelink", with: @lux_listingitem.iframelink
    fill_in "Interiorcolor", with: @lux_listingitem.interiorcolor
    fill_in "Listingcat", with: @lux_listingitem.listingcat
    fill_in "Luximg", with: @lux_listingitem.luximg
    fill_in "Mileage", with: @lux_listingitem.mileage
    fill_in "References", with: @lux_listingitem.references
    fill_in "Slug", with: @lux_listingitem.slug
    fill_in "Title", with: @lux_listingitem.title
    fill_in "Transmission", with: @lux_listingitem.transmission
    click_on "Update Lux listingitem"

    assert_text "Lux listingitem was successfully updated"
    click_on "Back"
  end

  test "destroying a Lux listingitem" do
    visit lux_listingitems_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Lux listingitem was successfully destroyed"
  end
end
