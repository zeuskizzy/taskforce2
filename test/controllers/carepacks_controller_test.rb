require "test_helper"

class CarepacksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @carepack = carepacks(:one)
  end

  test "should get index" do
    get carepacks_url
    assert_response :success
  end

  test "should get new" do
    get new_carepack_url
    assert_response :success
  end

  test "should create carepack" do
    assert_difference('Carepack.count') do
      post carepacks_url, params: { carepack: { date: @carepack.date, duration: @carepack.duration, email: @carepack.email, leave_package: @carepack.leave_package, message: @carepack.message, military_id: @carepack.military_id, name: @carepack.name, phone: @carepack.phone, price: @carepack.price, slug: @carepack.slug, status: @carepack.status, user_id: @carepack.user_id, verified: @carepack.verified } }
    end

    assert_redirected_to carepack_url(Carepack.last)
  end

  test "should show carepack" do
    get carepack_url(@carepack)
    assert_response :success
  end

  test "should get edit" do
    get edit_carepack_url(@carepack)
    assert_response :success
  end

  test "should update carepack" do
    patch carepack_url(@carepack), params: { carepack: { date: @carepack.date, duration: @carepack.duration, email: @carepack.email, leave_package: @carepack.leave_package, message: @carepack.message, military_id: @carepack.military_id, name: @carepack.name, phone: @carepack.phone, price: @carepack.price, slug: @carepack.slug, status: @carepack.status, user_id: @carepack.user_id, verified: @carepack.verified } }
    assert_redirected_to carepack_url(@carepack)
  end

  test "should destroy carepack" do
    assert_difference('Carepack.count', -1) do
      delete carepack_url(@carepack)
    end

    assert_redirected_to carepacks_url
  end
end
