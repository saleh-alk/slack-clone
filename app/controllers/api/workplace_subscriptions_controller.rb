class Api::WorkplaceSubscriptionsController < ApplicationController
    def index
        @subscriptions = WorkplaceSubscription.all
        @subscription = WorkplaceSubscription.new
        render :index
    end

    def create
        @subscription = workplace_subscription.new(workplace_subscription_params)
        @subscription.admin = current_user
        if @subscription.save
            render :show
        else
            render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    
     private
    def workplace_subscription_params
        params.require(:workplace_subscription).permit(:user_id, :workplace_id)
    end
end
