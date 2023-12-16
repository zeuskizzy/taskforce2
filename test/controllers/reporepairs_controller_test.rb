require "test_helper"

class ReporepairsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @reporepair = reporepairs(:one)
  end

  test "should get index" do
    get reporepairs_url
    assert_response :success
  end

  test "should get new" do
    get new_reporepair_url
    assert_response :success
  end

  test "should create reporepair" do
    assert_difference('Reporepair.count') do
      post reporepairs_url, params: { reporepair: { d_address: @reporepair.d_address, phone: @reporepair.phone, pk_address: @reporepair.pk_address, slug: @reporepair.slug, status: @reporepair.status, user_id: @reporepair.user_id, v_info: @reporepair.v_info, v_model: @reporepair.v_model, v_name: @reporepair.v_name, v_type: @reporepair.v_type, vimg: @reporepair.vimg } }
    end

    assert_redirected_to reporepair_url(Reporepair.last)
  end

  test "should show reporepair" do
    get reporepair_url(@reporepair)
    assert_response :success
  end

  test "should get edit" do
    get edit_reporepair_url(@reporepair)
    assert_response :success
  end

  test "should update reporepair" do
    patch reporepair_url(@reporepair), params: { reporepair: { d_address: @reporepair.d_address, phone: @reporepair.phone, pk_address: @reporepair.pk_address, slug: @reporepair.slug, status: @reporepair.status, user_id: @reporepair.user_id, v_info: @reporepair.v_info, v_model: @reporepair.v_model, v_name: @reporepair.v_name, v_type: @reporepair.v_type, vimg: @reporepair.vimg } }
    assert_redirected_to reporepair_url(@reporepair)
  end

  test "should destroy reporepair" do
    assert_difference('Reporepair.count', -1) do
      delete reporepair_url(@reporepair)
    end

    assert_redirected_to reporepairs_url
  end
end
