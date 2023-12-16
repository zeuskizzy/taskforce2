require "application_system_test_case"

class ListingitemsTest < ApplicationSystemTestCase
  setup do
    @listingitem = listingitems(:one)
  end

  test "visiting the index" do
    visit listingitems_url
    assert_selector "h1", text: "Listingitems"
  end

  test "creating a Listingitem" do
    visit listingitems_url
    click_on "New Listingitem"

    fill_in "Bodytype", with: @listingitem.bodytype
    fill_in "Condition", with: @listingitem.condition
    fill_in "Doors", with: @listingitem.doors
    fill_in "Drivetrain", with: @listingitem.drivetrain
    fill_in "Engine", with: @listingitem.engine
    fill_in "Exteriorcolor", with: @listingitem.exteriorcolor
    fill_in "Feul", with: @listingitem.feul
    fill_in "Iframelink", with: @listingitem.iframelink
    fill_in "Interiorcolor", with: @listingitem.interiorcolor
    fill_in "Listingcat", with: @listingitem.listingcat
    fill_in "Mileage", with: @listingitem.mileage
    fill_in "References", with: @listingitem.references
    fill_in "Slug", with: @listingitem.slug
    fill_in "Title", with: @listingitem.title
    fill_in "Transmission", with: @listingitem.transmission
    click_on "Create Listingitem"

    assert_text "Listingitem was successfully created"
    click_on "Back"
  end

  test "updating a Listingitem" do
    visit listingitems_url
    click_on "Edit", match: :first

    fill_in "Bodytype", with: @listingitem.bodytype
    fill_in "Condition", with: @listingitem.condition
    fill_in "Doors", with: @listingitem.doors
    fill_in "Drivetrain", with: @listingitem.drivetrain
    fill_in "Engine", with: @listingitem.engine
    fill_in "Exteriorcolor", with: @listingitem.exteriorcolor
    fill_in "Feul", with: @listingitem.feul
    fill_in "Iframelink", with: @listingitem.iframelink
    fill_in "Interiorcolor", with: @listingitem.interiorcolor
    fill_in "Listingcat", with: @listingitem.listingcat
    fill_in "Mileage", with: @listingitem.mileage
    fill_in "References", with: @listingitem.references
    fill_in "Slug", with: @listingitem.slug
    fill_in "Title", with: @listingitem.title
    fill_in "Transmission", with: @listingitem.transmission
    click_on "Update Listingitem"

    assert_text "Listingitem was successfully updated"
    click_on "Back"
  end

  test "destroying a Listingitem" do
    visit listingitems_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Listingitem was successfully destroyed"
  end
end
