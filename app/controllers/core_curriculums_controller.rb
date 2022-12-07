class CoreCurriculumsController < ApplicationController

    def index 
        core_curriculums = CoreCurriculum.all
        render json: core_curriculums
    end

    def show
        core_curriculum = CoreCurriculum.find(params[:id])
        render json: core_curriculum
    end

    def create
        core_curriculum = CoreCurriculum.create(core_curriculum_params)
        core.curriculum.save
        render json: core_curriculum, status: :created
    end

    def update
        core_curriculum = CoreCurriculum.find_by(id: params[:id])
        core_curriculum.update(core_curriculum_params)
        render json: core_curriculum
    end

    def destroy
        core_curriculum = CoreCurriculum.find_by(id: params[:id])
        core_curriculum.destroy
        head :no_content
    end

    private

    def core_curriculum_params
        params.require(:core_curriculum).permit(
            data: [
                :core_area,
                courses: [
                    :course_code,
                    :credit_hrs
                ]
            ]
        )
    end

end
