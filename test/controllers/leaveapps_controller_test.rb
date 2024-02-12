require "test_helper"

class LeaveappsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @leaveapp = leaveapps(:one)
  end

  test "should get index" do
    get leaveapps_url
    assert_response :success
  end

  test "should get new" do
    get new_leaveapp_url
    assert_response :success
  end

  test "should create leaveapp" do
    assert_difference('Leaveapp.count') do
      post leaveapps_url, params: { leaveapp: { date: @leaveapp.date, duration: @leaveapp.duration, email: @leaveapp.email, leave_package: @leaveapp.leave_package, message: @leaveapp.message, military_id: @leaveapp.military_id, name: @leaveapp.name, phone: @leaveapp.phone, price: @leaveapp.price, slug: @leaveapp.slug, status: @leaveapp.status, user_id: @leaveapp.user_id, verified: @leaveapp.verified } }
    end

    assert_redirected_to leaveapp_url(Leaveapp.last)
  end

  test "should show leaveapp" do
    get leaveapp_url(@leaveapp)
    assert_response :success
  end

  test "should get edit" do
    get edit_leaveapp_url(@leaveapp)
    assert_response :success
  end

  test "should update leaveapp" do
    patch leaveapp_url(@leaveapp), params: { leaveapp: { date: @leaveapp.date, duration: @leaveapp.duration, email: @leaveapp.email, leave_package: @leaveapp.leave_package, message: @leaveapp.message, military_id: @leaveapp.military_id, name: @leaveapp.name, phone: @leaveapp.phone, price: @leaveapp.price, slug: @leaveapp.slug, status: @leaveapp.status, user_id: @leaveapp.user_id, verified: @leaveapp.verified } }
    assert_redirected_to leaveapp_url(@leaveapp)
  end

  test "should destroy leaveapp" do
    assert_difference('Leaveapp.count', -1) do
      delete leaveapp_url(@leaveapp)
    end

    assert_redirected_to leaveapps_url
  end
end
