require "test_helper"

class RentalproductsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @rentalproduct = rentalproducts(:one)
  end

  test "should get index" do
    get rentalproducts_url
    assert_response :success
  end

  test "should get new" do
    get new_rentalproduct_url
    assert_response :success
  end

  test "should create rentalproduct" do
    assert_difference('Rentalproduct.count') do
      post rentalproducts_url, params: { rentalproduct: { body: @rentalproduct.body, desc: @rentalproduct.desc, discount: @rentalproduct.discount, location_id: @rentalproduct.location_id, price: @rentalproduct.price, rental_id: @rentalproduct.rental_id, service_id: @rentalproduct.service_id, slug: @rentalproduct.slug, sub_title: @rentalproduct.sub_title, title: @rentalproduct.title } }
    end

    assert_redirected_to rentalproduct_url(Rentalproduct.last)
  end

  test "should show rentalproduct" do
    get rentalproduct_url(@rentalproduct)
    assert_response :success
  end

  test "should get edit" do
    get edit_rentalproduct_url(@rentalproduct)
    assert_response :success
  end

  test "should update rentalproduct" do
    patch rentalproduct_url(@rentalproduct), params: { rentalproduct: { body: @rentalproduct.body, desc: @rentalproduct.desc, discount: @rentalproduct.discount, location_id: @rentalproduct.location_id, price: @rentalproduct.price, rental_id: @rentalproduct.rental_id, service_id: @rentalproduct.service_id, slug: @rentalproduct.slug, sub_title: @rentalproduct.sub_title, title: @rentalproduct.title } }
    assert_redirected_to rentalproduct_url(@rentalproduct)
  end

  test "should destroy rentalproduct" do
    assert_difference('Rentalproduct.count', -1) do
      delete rentalproduct_url(@rentalproduct)
    end

    assert_redirected_to rentalproducts_url
  end
end
