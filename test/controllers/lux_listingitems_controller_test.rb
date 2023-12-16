require "test_helper"

class LuxListingitemsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @lux_listingitem = lux_listingitems(:one)
  end

  test "should get index" do
    get lux_listingitems_url
    assert_response :success
  end

  test "should get new" do
    get new_lux_listingitem_url
    assert_response :success
  end

  test "should create lux_listingitem" do
    assert_difference('LuxListingitem.count') do
      post lux_listingitems_url, params: { lux_listingitem: { bodytype: @lux_listingitem.bodytype, condition: @lux_listingitem.condition, doors: @lux_listingitem.doors, drivetrain: @lux_listingitem.drivetrain, engine: @lux_listingitem.engine, exteriorcolor: @lux_listingitem.exteriorcolor, feul: @lux_listingitem.feul, iframelink: @lux_listingitem.iframelink, interiorcolor: @lux_listingitem.interiorcolor, listingcat: @lux_listingitem.listingcat, luximg: @lux_listingitem.luximg, mileage: @lux_listingitem.mileage, references: @lux_listingitem.references, slug: @lux_listingitem.slug, title: @lux_listingitem.title, transmission: @lux_listingitem.transmission } }
    end

    assert_redirected_to lux_listingitem_url(LuxListingitem.last)
  end

  test "should show lux_listingitem" do
    get lux_listingitem_url(@lux_listingitem)
    assert_response :success
  end

  test "should get edit" do
    get edit_lux_listingitem_url(@lux_listingitem)
    assert_response :success
  end

  test "should update lux_listingitem" do
    patch lux_listingitem_url(@lux_listingitem), params: { lux_listingitem: { bodytype: @lux_listingitem.bodytype, condition: @lux_listingitem.condition, doors: @lux_listingitem.doors, drivetrain: @lux_listingitem.drivetrain, engine: @lux_listingitem.engine, exteriorcolor: @lux_listingitem.exteriorcolor, feul: @lux_listingitem.feul, iframelink: @lux_listingitem.iframelink, interiorcolor: @lux_listingitem.interiorcolor, listingcat: @lux_listingitem.listingcat, luximg: @lux_listingitem.luximg, mileage: @lux_listingitem.mileage, references: @lux_listingitem.references, slug: @lux_listingitem.slug, title: @lux_listingitem.title, transmission: @lux_listingitem.transmission } }
    assert_redirected_to lux_listingitem_url(@lux_listingitem)
  end

  test "should destroy lux_listingitem" do
    assert_difference('LuxListingitem.count', -1) do
      delete lux_listingitem_url(@lux_listingitem)
    end

    assert_redirected_to lux_listingitems_url
  end
end
