// ❌ ПЛОХО: Нарушение LSP - функции-обработчики не могут заменить базовую функцию
//
// 1. ❌ НАРУШЕНИЕ КОНТРАКТА - функции-обработчики требуют более строгие условия
// 2. ❌ НАРУШЕНИЕ ПРИНЦИПА ПОДСТАНОВКИ - функции не взаимозаменяемы
// 3. ❌ НЕОЖИДАННЫЕ ИСКЛЮЧЕНИЯ - функции бросают ошибки при валидных входных данных
// 4. ❌ СУЖЕНИЕ ПРЕДУСЛОВИЙ - функции принимают не все валидные входы базовой функции
// 5. ❌ НАРУШЕНИЕ ПОЛИМОРФИЗМА - код должен знать конкретную функцию для работы

interface ShapeData {
  getArea(): number;
  getPerimeter(): number;
  // Жесткий формат: "ИМЯ: Area=ЧИСЛО, Perimeter=ЧИСЛО"
  getInfo(): `${string}: Area=${string}, Perimeter=${string}`;
}

function createRectangle(width: number, height: number): ShapeData {
  return {
    getArea: () => width * height,
    getPerimeter: () => 2 * (width + height),
    getInfo: () =>
      `Rectangle: Area=${(width * height).toFixed(2)}, Perimeter=${(
        2 *
        (width + height)
      ).toFixed(2)}`,
  };
}

function createCircle(radius: number): ShapeData {
  return {
    getArea: () => Math.PI * radius * radius,
    getPerimeter: () => 2 * Math.PI * radius,
    getInfo: () =>
      `Circle: Area=${(Math.PI * radius * radius).toFixed(2)}, Perimeter=${(
        2 *
        Math.PI *
        radius
      ).toFixed(2)}`,
  };
}

function createTriangle(
  side1: number,
  side2: number,
  side3: number
): ShapeData {
  return {
    getArea: () => {
      const perimeter = side1 + side2 + side3;
      const s = perimeter / 2;
      return Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));
    },
    getPerimeter: () => side1 + side2 + side3,
    getInfo: () => {
      const area = (() => {
        const perimeter = side1 + side2 + side3;
        const s = perimeter / 2;
        return Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));
      })();
      const perimeter = side1 + side2 + side3;
      return `Triangle: Area=${area.toFixed(2)}, Perimeter=${perimeter.toFixed(
        2
      )}`;
    },
  };
}

// ✅ Базовая функция-обработчик с широким контрактом
// 💡 КОНТРАКТ: Принимает любую ShapeData, возвращает стандартную информацию
// 🎯 ОБЕЩАНИЕ: Работает с любыми ShapeData, никогда не бросает исключений
function processShape(shape: ShapeData): {
  info: string;
  area: number;
  perimeter: number;
} {
  return {
    info: shape.getInfo(),
    area: shape.getArea(),
    perimeter: shape.getPerimeter(),
  };
}

// ❌ НАРУШЕНИЕ LSP: Функция требует более строгие условия, чем базовая
// 💡 ЧТО НЕ ТАК: Добавляет дополнительные проверки и ограничения
// 🎯 РЕЗУЛЬТАТ: Не может заменить processShape для всех валидных входов
const processOnlyLargeShapes: typeof processShape = (shape: ShapeData) => {
  const area = shape.getArea();

  // ❌ НАРУШЕНИЕ LSP: Добавляет предусловие, которого нет в базовой функции
  if (area < 10) {
    throw new Error("Shape area must be at least 10"); // ❌ Базовая функция любые площади обрабатывает!
  }

  return {
    info: shape.getInfo(),
    area: area,
    perimeter: shape.getPerimeter(),
  };
};

// ❌ НАРУШЕНИЕ LSP: Функция работает только с кругами
// 💡 ЧТО НЕ ТАК: Сужает предусловия - анализирует содержимое info для определения типа
// 🎯 РЕЗУЛЬТАТ: Нарушает принцип подстановки Лисков
const processOnlyCircles: typeof processShape = (shape: ShapeData) => {
  const info = shape.getInfo();

  // ❌ НАРУШЕНИЕ LSP: Добавляет ограничения на тип фигуры
  if (!info.startsWith("Circle:")) {
    throw new Error("Only circles are supported"); // ❌ Базовая функция любые типы обрабатывает!
  }

  return {
    info: shape.getInfo(),
    area: shape.getArea(),
    perimeter: shape.getPerimeter(),
  };
};

// ❌ НАРУШЕНИЕ LSP: Функция меняет формат возвращаемых данных
// 💡 ЧТО НЕ ТАК: Нарушает постусловия - возвращает неправильную структуру
// 🎯 РЕЗУЛЬТАТ: Клиенты получают неожиданный формат данных
const processShapeWithBrokenOutput: typeof processShape = (
  shape: ShapeData
) => {
  // ❌ НАРУШЕНИЕ LSP: Возвращает данные в неправильном формате
  return {
    info: "", // ❌ Пустая строка вместо правильной информации
    area: -1, // ❌ Невозможная отрицательная площадь
    perimeter: shape.getArea(), // ❌ Возвращает площадь вместо периметра!
  };
};

// ❌ НАРУШЕНИЕ LSP: Функция добавляет побочные эффекты
// 💡 ЧТО НЕ ТАК: Добавляет side effects, которых нет в базовой функции
// 🎯 РЕЗУЛЬТАТ: Неожиданное поведение при замещении
const processShapeWithSideEffects: typeof processShape = (shape: ShapeData) => {
  // ❌ НАРУШЕНИЕ LSP: Добавляет побочные эффекты
  console.log("LOGGING: Processing shape..."); // ❌ Базовая функция ничего не логирует!

  // ❌ Еще хуже - модификация глобального состояния
  (globalThis as any).lastProcessedShape = shape; // ❌ Базовая функция чистая!

  return {
    info: shape.getInfo(),
    area: shape.getArea(),
    perimeter: shape.getPerimeter(),
  };
};

// ❌ ДЕМОНСТРАЦИЯ ПРОБЛЕМЫ: Функция высшего порядка ломается из-за нарушений LSP
function processMultipleShapes(
  processor: typeof processShape,
  shapes: ShapeData[]
): { results: string[]; errors: string[]; successCount: number } {
  const results: string[] = [];
  const errors: string[] = [];
  let successCount = 0;

  shapes.forEach((shape, index) => {
    try {
      // ❌ ПРОБЛЕМА: Код ожидает поведение processShape
      const result = processor(shape);

      // ❌ НАРУШЕНИЕ LSP: result.info может быть пустой (processShapeWithBrokenOutput)
      if (result.info) {
        results.push(result.info);
        successCount++;
      } else {
        errors.push(`Shape ${index}: Empty info returned`);
      }
    } catch (error: any) {
      // ❌ НАРУШЕНИЕ LSP: Неожиданные исключения
      errors.push(`Shape ${index}: ${error.message}`);
    }
  });

  return { results, errors, successCount };
}

// ❌ ДЕМОНСТРАЦИЯ НАРУШЕНИЙ: Тестовые данные
const testShapes: ShapeData[] = [
  createRectangle(4, 6), // area = 24 (большая)
  createCircle(1), // area ≈ 3.14 (маленькая)
  createTriangle(3, 4, 5), // area = 6 (средняя)
  createRectangle(2, 2), // area = 4 (маленькая)
];

// ✅ Базовая функция работает со всеми данными
const baseResults = processMultipleShapes(processShape, testShapes);

// ❌ НАРУШЕНИЕ LSP: processOnlyLargeShapes ломается на маленьких фигурах
const largeResults = processMultipleShapes(processOnlyLargeShapes, testShapes);

// ❌ НАРУШЕНИЕ LSP: processOnlyCircles ломается на не-кругах
const circleResults = processMultipleShapes(processOnlyCircles, testShapes);

// ❌ НАРУШЕНИЕ LSP: processShapeWithBrokenOutput нарушает формат
const brokenResults = processMultipleShapes(
  processShapeWithBrokenOutput,
  testShapes
);

// ❌ НАРУШЕНИЕ LSP: processShapeWithSideEffects добавляет побочные эффекты
const sideEffectResults = processMultipleShapes(
  processShapeWithSideEffects,
  testShapes
);

export {};
