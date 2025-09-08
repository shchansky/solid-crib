// ❌ ПЛОХО: Нарушение DIP - классы зависят от конкретных реализаций, а не от абстракций
//
// 1. ❌ ВЫСОКОУРОВНЕВЫЕ ПРОГРАММНЫЕ СУЩНОСТИ ЗАВИСЯТ ОТ НИЗКОУРОВНЕВЫХ
//    - ShapeCalculator (высокоуровневый) зависит от Circle, Rectangle, Triangle (низкоуровневые)
//    - ShapeCalculator создает конкретные объекты: new Circle(), new Rectangle(), new Triangle()
//
// 2. ❌ НЕ ОБА ТИПА ЗАВИСЯТ ОТ АБСТРАКЦИЙ
//    - Высокоуровневые программные сущности: ShapeCalculator зависит от конкретных классов
//    - Низкоуровневые программные сущности: Circle, Rectangle, Triangle НЕ реализуют общий интерфейс
//
// 3. ❌ АБСТРАКЦИИ ЗАВИСЯТ ОТ ДЕТАЛЕЙ (их просто нет!)
//    - Нет интерфейсов Shape
//    - Все зависимости направлены к конкретным классам
//
// 4. ❌ ДЕТАЛИ НЕ ЗАВИСЯТ ОТ АБСТРАКЦИЙ
//    - Circle, Rectangle, Triangle НЕ реализуют общий интерфейс
//    - Каждый класс живет своей жизнью без общего контракта

class Circle {
  constructor(private radius: number) {}

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }

  getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }

  getInfo(): string {
    return `Circle: radius=${this.radius}`;
  }
}

class Rectangle {
  constructor(private width: number, private height: number) {}

  getArea(): number {
    return this.width * this.height;
  }

  getPerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

// ❌ НАРУШЕНИЕ DIP: Интерфейс данных зависит от конкретных реализаций
// 💡 ЧТО НЕ ТАК: Интерфейс знает о конкретных типах фигур. Интерфейс привязан к конкретным классам Circle и Rectangle
interface ShapeData {
  circledata: { radius: number };
  rectangledata: { width: number; height: number };
}

// ❌ НАРУШЕНИЕ DIP: Класс зависит от конкретных реализаций.
// 💡 ЧТО НЕ ТАК:
//    - Класс создает конкретные объекты внутри себя
//    - Зависит от конкретных типов Circle и Rectangle
//    - Нельзя легко заменить реализации для тестирования
class ShapeCalculator {
  // ❌ ПРОБЛЕМА: Зависимость от конкретных классов
  // 💡 ЧТО НЕ ТАК: Высокоуровневая программная сущность зависит от низкоуровневых
  private circle: Circle;
  private rectangle: Rectangle;

  constructor({
    circledata: { radius },
    rectangledata: { width, height },
  }: ShapeData) {
    // ❌ НАРУШЕНИЕ DIP: Создание конкретных зависимостей внутри класса. Высокоуровневая программная сущность создает низкоуровневые программные сущности и зависит от них
    // 💡 ЧТО НЕ ТАК: Класс сам создает свои зависимости - это нарушает DIP
    this.circle = new Circle(radius);
    this.rectangle = new Rectangle(width, height);
  }

  // ❌ ПРОБЛЕМА: Методы работают с конкретными типами
  // 💡 ЧТО НЕ ТАК: Каждый метод знает о конкретном типе фигуры
  calculateCircleArea(): number {
    return this.circle.getArea();
  }

  calculateRectangleArea(): number {
    return this.rectangle.getArea();
  }

  // ❌ ПРОБЛЕМА: Невозможно добавить новую фигуру без изменения класса
  // 💡 ЧТО НЕ ТАК: Для добавления,например,треугольника Triangle нужно изменить этот класс
  // calculateTriangleArea(): number {
  //     // Пришлось бы добавить новый метод и новое поле
  // }
}

// ❌ ДЕМОНСТРАЦИЯ ПРОБЛЕМ: Сложность тестирования
// 💡 ЧТО НЕ ТАК: Нельзя легко заменить Circle на мок для тестирования
function demonstrateTestingProblems() {
  const calculator = new ShapeCalculator({
    circledata: { radius: 5 },
    rectangledata: { width: 4, height: 6 },
  });

  // ❌ ПРОБЛЕМА: Нельзя протестировать с мок-объектами
  // const mockCalculator = new ShapeCalculator({
  //     Невозможно передать мок-объекты вместо реальных Circle и Rectangle. Т.к. ShapeCalculator сам создает new Circle() и new Rectangle() внутри конструктора
  // });
}

export {};
