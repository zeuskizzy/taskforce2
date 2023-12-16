require "test_helper"

class ReporescuesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @reporescue = reporescues(:one)
  end

  test "should get index" do
    get reporescues_url
    assert_response :success
  end

  test "should get new" do
    get new_reporescue_url
    assert_response :success
  end

  test "should create reporescue" do
    assert_difference('Reporescue.count') do
      post reporescues_url, params: { reporescue: { d_address: @reporescue.d_address, phone: @reporescue.phone, pk_address: @reporescue.pk_address, repo_plan: @reporescue.repo_plan, repo_time: @reporescue.repo_time, slug: @reporescue.slug, status: @reporescue.status, user_id: @reporescue.user_id, v_debt: @reporescue.v_debt, v_info: @reporescue.v_info, v_model: @reporescue.v_model, v_name: @reporescue.v_name, v_type: @reporescue.v_type, vrepoimg: @reporescue.vrepoimg } }
    end

    assert_redirected_to reporescue_url(Reporescue.last)
  end

  test "should show reporescue" do
    get reporescue_url(@reporescue)
    assert_response :success
  end

  test "should get edit" do
    get edit_reporescue_url(@reporescue)
    assert_response :success
  end

  test "should update reporescue" do
    patch reporescue_url(@reporescue), params: { reporescue: { d_address: @reporescue.d_address, phone: @reporescue.phone, pk_address: @reporescue.pk_address, repo_plan: @reporescue.repo_plan, repo_time: @reporescue.repo_time, slug: @reporescue.slug, status: @reporescue.status, user_id: @reporescue.user_id, v_debt: @reporescue.v_debt, v_info: @reporescue.v_info, v_model: @reporescue.v_model, v_name: @reporescue.v_name, v_type: @reporescue.v_type, vrepoimg: @reporescue.vrepoimg } }
    assert_redirected_to reporescue_url(@reporescue)
  end

  test "should destroy reporescue" do
    assert_difference('Reporescue.count', -1) do
      delete reporescue_url(@reporescue)
    end

    assert_redirected_to reporescues_url
  end
end
