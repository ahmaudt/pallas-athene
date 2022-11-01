class StudentsController < ApplicationController

    def index
        students = Student.all
        render json: students
    end

    def show
        student = Student.find(params[:id])
        render json: student
    end

    def update
        student = Student.find_by(id: params[:id])
        student.update(student_params)
        render json: student
    end

    def destroy
        student = Student.find_by(id: params[:id])
        student.destroy
        head :no_content
    end

    private

    def student_params
        params.permit(
            data: [
                :uga_my_id,
                :first_name,
                :last_name,
                :matriculation_term,
                :graduation_term,
                :majors [
                    :name,
                    :credit_hrs
                ],
                :minors [
                    :name,
                    :credit_hrs
                ],
                :certificates [
                    :name,
                    :credit_hrs
                ],
            ]
        )
    end
end
