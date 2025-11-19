from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai.agents.agent_builder.base_agent import BaseAgent
from typing import List
# If you want to run a snippet of code before or after the crew starts,
# you can use the @before_kickoff and @after_kickoff decorators
# https://docs.crewai.com/concepts/crews#example-crew-class-with-decorators

@CrewBase
class DentalRecallCrew():
    """DentalRecallCrew - HIPAA-compliant dental appointment reminder system"""

    agents: List[BaseAgent]
    tasks: List[Task]

    # Learn more about YAML configuration files here:
    # Agents: https://docs.crewai.com/concepts/agents#yaml-configuration-recommended
    # Tasks: https://docs.crewai.com/concepts/tasks#yaml-configuration-recommended
    
    # If you would like to add tools to your agents, you can learn more about it here:
    # https://docs.crewai.com/concepts/agents#agent-tools
    @agent
    def hipaa_compliance_officer(self) -> Agent:
        return Agent(
            config=self.agents_config['hipaa_compliance_officer'], # type: ignore[index]
            verbose=True
        )

    @agent
    def dental_scheduler(self) -> Agent:
        return Agent(
            config=self.agents_config['dental_scheduler'], # type: ignore[index]
            verbose=True
        )

    @agent
    def reminder_coordinator(self) -> Agent:
        return Agent(
            config=self.agents_config['reminder_coordinator'], # type: ignore[index]
            verbose=True
        )

    # To learn more about structured task outputs,
    # task dependencies, and task callbacks, check out the documentation:
    # https://docs.crewai.com/concepts/tasks#overview-of-a-task
    @task
    def validate_message_task(self) -> Task:
        return Task(
            config=self.tasks_config['validate_message_task'], # type: ignore[index]
        )

    @task
    def schedule_reminder_task(self) -> Task:
        return Task(
            config=self.tasks_config['schedule_reminder_task'], # type: ignore[index]
        )

    @task
    def coordinate_reminders_task(self) -> Task:
        return Task(
            config=self.tasks_config['coordinate_reminders_task'], # type: ignore[index]
            output_file='reminder_report.json'
        )

    @crew
    def crew(self) -> Crew:
        """Creates the DentalRecallCrew for HIPAA-compliant appointment reminders"""
        # To learn how to add knowledge sources to your crew, check out the documentation:
        # https://docs.crewai.com/concepts/knowledge#what-is-knowledge

        return Crew(
            agents=self.agents, # Automatically created by the @agent decorator
            tasks=self.tasks, # Automatically created by the @task decorator
            process=Process.sequential,
            verbose=True,
            # process=Process.hierarchical, # In case you wanna use that instead https://docs.crewai.com/how-to/Hierarchical/
        )
