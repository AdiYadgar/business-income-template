pipeline {
    agent any

    parameters {
        string(name: 'BUSINESS_NAME', defaultValue: 'My Business', description: 'Business name')
        choice(name: 'RUN_ON', choices: ['master', 'agent'], description: 'Where to run')
        string(name: 'INCOME', defaultValue: '10000', description: 'Monthly income')
        string(name: 'EXPENSES', defaultValue: '4000', description: 'Monthly expenses')
        booleanParam(name: 'INCLUDE_TAX', defaultValue: true, description: 'Include tax?')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Validate Parameters') {
            steps {
                echo "Business: ${params.BUSINESS_NAME}"
                echo "Income: ${params.INCOME}"
                echo "Expenses: ${params.EXPENSES}"
                echo "Include tax: ${params.INCLUDE_TAX}"
                echo "Run on: ${params.RUN_ON}"
            }
        }

stage('Run Script') {
    steps {
        sh """
            node script.js "${params.BUSINESS_NAME}" ${params.INCOME} ${params.EXPENSES} ${params.INCLUDE_TAX}
        """
    }
}

stage('Archive Results') {
    steps {
        archiveArtifacts artifacts: 'output/*'
    }
}
