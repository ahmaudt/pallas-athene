class StudentsController < ApplicationController

    def index
        students = Student.all
        render json: students
    end

    def show
        student = Student.find(params[:id])
        render json: student
    end

    def create
        student = Student.create(student_params)
        student.user_id = @current_user.id
        student.save
        render json: student, status: :created
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
        params.require(:student).permit(:user_id, :student, data: [
            :uga_my_id,
            :first_name,
            :last_name,
            :email,
            :matriculation_term,
            :graduation_term,
            :pre_professional,
            programs: [
                :program_code,
                :program_name,
                :program_type,
                :credit_hrs
            ]
        ])
    end
end
