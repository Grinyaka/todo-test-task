import {CreateProjectInteractor} from './interactors/CreateProjectInteractor'
import {CreateTaskInteractor} from './interactors/CreateTaskInteractor'
import {GetProjectsListInteractor} from './interactors/GetProjectsListInteractor'
import {ProjectsRepository} from './repository/projectsRepository/ProjectsRepository'
import {ProjectsRepositoryLocal} from './repository/projectsRepository/ProjectsRepositoryLocal'
import {TasksRepository} from './repository/tasksRepository/TasksRepository'
import {TasksRepositoryLocal} from './repository/tasksRepository/TasksRepositoryLocal'

export class Factory<T> {
  private readonly creator: () => T
  private readonly singleton: boolean

  constructor(creator: () => T, singleton: boolean) {
    this.creator = creator
    this.singleton = singleton
  }

  public create(): T {
    return this.creator()
  }

  public isSingleton(): boolean {
    return this.singleton
  }
}

type Newable<T> = new (...args: any[]) => T

interface Abstract<T> {
  prototype: T
}

type Qualifier = Newable<any> | Abstract<any>

export const injectionKernel = new Map<Qualifier, Factory<any>>()
const mapSingleton = new Map<Qualifier, any>()

const initValue = <T>(qualifier: Qualifier): T => {
  if (injectionKernel.has(qualifier) && !mapSingleton.has(qualifier)) {
    const factory = injectionKernel.get(qualifier)!
    const result: T = factory?.create()

    if (factory.isSingleton()) {
      mapSingleton.set(qualifier, result)
    }
    return result
  } else if (!injectionKernel.has(qualifier)) {
    throw new Error(`${qualifier} not implemented`)
  }

  const value = mapSingleton.get(qualifier) as Qualifier

  return value as any as T
}

export const getDIValue = <T>(qualifier: Qualifier): T => initValue(qualifier)

export const useInject = <T>(qualifier: Qualifier): T => initValue(qualifier)

export const lazyInject = (qualifier: Qualifier) => {
  return (target: object, key: string, props?: any) => {
    props.initializer = (): any => initValue(qualifier)
  }
}

injectionKernel.set(ProjectsRepository, new Factory<ProjectsRepository>(() => new ProjectsRepositoryLocal(), true))

injectionKernel.set(TasksRepository, new Factory<TasksRepository>(() => new TasksRepositoryLocal(), true))

injectionKernel.set(
  CreateTaskInteractor,
  new Factory<CreateTaskInteractor>(
    () => new CreateTaskInteractor(getDIValue(TasksRepository), getDIValue(ProjectsRepository)),
    false,
  ),
)

injectionKernel.set(
  GetProjectsListInteractor,
  new Factory<GetProjectsListInteractor>(() => new GetProjectsListInteractor(getDIValue(ProjectsRepository)), false),
)

injectionKernel.set(
  CreateProjectInteractor,
  new Factory<CreateProjectInteractor>(() => new CreateProjectInteractor(getDIValue(ProjectsRepository)), false),
)
