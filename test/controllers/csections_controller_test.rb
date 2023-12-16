require "test_helper"

class CsectionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @csection = csections(:one)
  end

  test "should get index" do
    get csections_url
    assert_response :success
  end

  test "should get new" do
    get new_csection_url
    assert_response :success
  end

  test "should create csection" do
    assert_difference('Csection.count') do
      post csections_url, params: { csection: { body: @csection.body, csecctionimg: @csection.csecctionimg, slug: @csection.slug, sub_title: @csection.sub_title, title: @csection.title } }
    end

    assert_redirected_to csection_url(Csection.last)
  end

  test "should show csection" do
    get csection_url(@csection)
    assert_response :success
  end

  test "should get edit" do
    get edit_csection_url(@csection)
    assert_response :success
  end

  test "should update csection" do
    patch csection_url(@csection), params: { csection: { body: @csection.body, csecctionimg: @csection.csecctionimg, slug: @csection.slug, sub_title: @csection.sub_title, title: @csection.title } }
    assert_redirected_to csection_url(@csection)
  end

  test "should destroy csection" do
    assert_difference('Csection.count', -1) do
      delete csection_url(@csection)
    end

    assert_redirected_to csections_url
  end
end
