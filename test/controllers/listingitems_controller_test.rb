require "test_helper"

class ListingitemsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @listingitem = listingitems(:one)
  end

  test "should get index" do
    get listingitems_url
    assert_response :success
  end

  test "should get new" do
    get new_listingitem_url
    assert_response :success
  end

  test "should create listingitem" do
    assert_difference('Listingitem.count') do
      post listingitems_url, params: { listingitem: { bodytype: @listingitem.bodytype, condition: @listingitem.condition, doors: @listingitem.doors, drivetrain: @listingitem.drivetrain, engine: @listingitem.engine, exteriorcolor: @listingitem.exteriorcolor, feul: @listingitem.feul, iframelink: @listingitem.iframelink, interiorcolor: @listingitem.interiorcolor, listingcat: @listingitem.listingcat, mileage: @listingitem.mileage, references: @listingitem.references, slug: @listingitem.slug, title: @listingitem.title, transmission: @listingitem.transmission } }
    end

    assert_redirected_to listingitem_url(Listingitem.last)
  end

  test "should show listingitem" do
    get listingitem_url(@listingitem)
    assert_response :success
  end

  test "should get edit" do
    get edit_listingitem_url(@listingitem)
    assert_response :success
  end

  test "should update listingitem" do
    patch listingitem_url(@listingitem), params: { listingitem: { bodytype: @listingitem.bodytype, condition: @listingitem.condition, doors: @listingitem.doors, drivetrain: @listingitem.drivetrain, engine: @listingitem.engine, exteriorcolor: @listingitem.exteriorcolor, feul: @listingitem.feul, iframelink: @listingitem.iframelink, interiorcolor: @listingitem.interiorcolor, listingcat: @listingitem.listingcat, mileage: @listingitem.mileage, references: @listingitem.references, slug: @listingitem.slug, title: @listingitem.title, transmission: @listingitem.transmission } }
    assert_redirected_to listingitem_url(@listingitem)
  end

  test "should destroy listingitem" do
    assert_difference('Listingitem.count', -1) do
      delete listingitem_url(@listingitem)
    end

    assert_redirected_to listingitems_url
  end
end
