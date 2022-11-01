class PlansController < ApplicationController
    def index
        plans = Plan.all
        render json: plans
    end

    def show
        plan = Plan.find_by(id: params[:id])
        render json: plan
    end

    def create
        plan = Plan.create!(plan_params)
        render json: plan, status: :created
    end

    def update
        plan = Plan.find_by(id: params[:id])
        plan.update(plan_params)
        render json: plan
    end

    def destroy
        plan = Plan.find_by(id: params[:id])
        plan.destroy
        head :no_content
    end

    private

    def plan_params
        params.permit(:student_id, data: [
            :current_term,
            :advising_term,
            :recommendations [
                :requirement,
                :course,
                :alt_course
            ]
        ])
    end
end
