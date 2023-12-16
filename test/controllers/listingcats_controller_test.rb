require "test_helper"

class ListingcatsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @listingcat = listingcats(:one)
  end

  test "should get index" do
    get listingcats_url
    assert_response :success
  end

  test "should get new" do
    get new_listingcat_url
    assert_response :success
  end

  test "should create listingcat" do
    assert_difference('Listingcat.count') do
      post listingcats_url, params: { listingcat: { status: @listingcat.status, title: @listingcat.title } }
    end

    assert_redirected_to listingcat_url(Listingcat.last)
  end

  test "should show listingcat" do
    get listingcat_url(@listingcat)
    assert_response :success
  end

  test "should get edit" do
    get edit_listingcat_url(@listingcat)
    assert_response :success
  end

  test "should update listingcat" do
    patch listingcat_url(@listingcat), params: { listingcat: { status: @listingcat.status, title: @listingcat.title } }
    assert_redirected_to listingcat_url(@listingcat)
  end

  test "should destroy listingcat" do
    assert_difference('Listingcat.count', -1) do
      delete listingcat_url(@listingcat)
    end

    assert_redirected_to listingcats_url
  end
end
