require "test_helper"

class VehiclesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @vehicle = vehicles(:one)
  end

  test "should get index" do
    get vehicles_url
    assert_response :success
  end

  test "should get new" do
    get new_vehicle_url
    assert_response :success
  end

  test "should create vehicle" do
    assert_difference('Vehicle.count') do
      post vehicles_url, params: { vehicle: { l_address: @vehicle.l_address, l_email: @vehicle.l_email, l_first_name: @vehicle.l_first_name, l_last_name: @vehicle.l_last_name, l_phone: @vehicle.l_phone, slug: @vehicle.slug, user_id: @vehicle.user_id, v_info: @vehicle.v_info, v_name: @vehicle.v_name, v_plate_number: @vehicle.v_plate_number, v_type: @vehicle.v_type } }
    end

    assert_redirected_to vehicle_url(Vehicle.last)
  end

  test "should show vehicle" do
    get vehicle_url(@vehicle)
    assert_response :success
  end

  test "should get edit" do
    get edit_vehicle_url(@vehicle)
    assert_response :success
  end

  test "should update vehicle" do
    patch vehicle_url(@vehicle), params: { vehicle: { l_address: @vehicle.l_address, l_email: @vehicle.l_email, l_first_name: @vehicle.l_first_name, l_last_name: @vehicle.l_last_name, l_phone: @vehicle.l_phone, slug: @vehicle.slug, user_id: @vehicle.user_id, v_info: @vehicle.v_info, v_name: @vehicle.v_name, v_plate_number: @vehicle.v_plate_number, v_type: @vehicle.v_type } }
    assert_redirected_to vehicle_url(@vehicle)
  end

  test "should destroy vehicle" do
    assert_difference('Vehicle.count', -1) do
      delete vehicle_url(@vehicle)
    end

    assert_redirected_to vehicles_url
  end
end
