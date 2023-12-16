class PlansController < InheritedResources::Base

  private

    def plan_params
      params.require(:plan).permit(:name, :amount, :plan_name, :referal, :duration, :mini, :maxi, :body)
    end

end
