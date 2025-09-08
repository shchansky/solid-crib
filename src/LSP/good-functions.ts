// ✅ ХОРОШО: Соблюдение LSP в функциональном стиле
//
// 1. ✅ СОБЛЮДЕНИЕ КОНТРАКТА - все функции-обработчики следуют одному интерфейсу
// 2. ✅ ВЗАИМОЗАМЕНЯЕМОСТЬ - любая функция может заменить базовую без нарушения поведения
// 3. ✅ РАСШИРЕНИЕ ПРЕДУСЛОВИЙ - функции принимают более общие типы (контравариантность)
// 4. ✅ СУЖЕНИЕ ПОСТУСЛОВИЙ - функции могут возвращать более специфичные типы (ковариантность)
// 5. ✅ ОТСУТСТВИЕ ДОПОЛНИТЕЛЬНЫХ ОГРАНИЧЕНИЙ - не добавляют новые исключения или требования

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
      const s = perimeter / 2; // полупериметр для формулы Герона
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

// ✅ LSP: Базовая функция-обработчик с широким контрактом
// 💡 КОНТРАКТ: Принимает любую ShapeData, возвращает стандартную информацию
// 🎯 РЕЗУЛЬТАТ: Любой объект, реализующий ShapeData, может быть обработан
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

// ✅ LSP: Функция-заменитель расширяет предусловия (принимает более общий тип)
// 💡 ПРЕИМУЩЕСТВО: Может обработать как ShapeData, так и более общие объекты
function processShapeFlexible(
  shape: ShapeData | { type: string }
): ReturnType<typeof processShape> {
  // Проверяем, является ли объект полной ShapeData
  if ("getArea" in shape && "getPerimeter" in shape && "getInfo" in shape) {
    return processShape(shape);
  }

  // Обрабатываем неполные данные с дефолтными значениями
  return {
    info: `Incomplete ${(shape as any).type}: area=unknown, perimeter=unknown`,
    area: 0,
    perimeter: 0,
  };
}

// ✅ LSP: Функция-заменитель сужает постусловия (возвращает более специфичный тип)
// 💡 ПРЕИМУЩЕСТВО: Возвращает дополнительную информацию, сохраняя базовый контракт
function processShapeDetailed(shape: ShapeData): ReturnType<
  typeof processShape
> & {
  info: string;
  area: number;
  perimeter: number;
  // Дополнительные поля не нарушают LSP
  shapeType: string;
  timestamp: number;
} {
  const base = processShape(shape);
  return {
    ...base,
    shapeType: shape.getInfo().split(":")[0],
    timestamp: Date.now(),
  };
}

// ✅ ДЕМОНСТРАЦИЯ LSP: Функции-заменители работают с базовой функцией
// 💡 ПРЕИМУЩЕСТВО: Высшая функция принимает любую функцию, соблюдающую контракт
// 🎯 РЕЗУЛЬТАТ: Полиморфизм функций работает корректно
function demonstrateFunctionSubstitution(
  processor: (shape: ShapeData) => {
    info: string;
    area: number;
    perimeter: number;
  },
  shapes: ShapeData[]
): {
  processorName: string;
  results: string[];
  totalArea: number;
  totalPerimeter: number;
} {
  const results: string[] = [];
  let totalArea = 0;
  let totalPerimeter = 0;

  shapes.forEach((shape) => {
    const result = processor(shape);
    results.push(
      `${result.info} | Area: ${result.area.toFixed(
        2
      )} | Perimeter: ${result.perimeter.toFixed(2)}`
    );
    totalArea += result.area;
    totalPerimeter += result.perimeter;
  });

  return {
    processorName: processor.name || "anonymous",
    results,
    totalArea,
    totalPerimeter,
  };
}

// ✅ Создаем тестовые фигуры
const rectangle = createRectangle(4, 6);
const circle = createCircle(5);
const triangle = createTriangle(3, 4, 5);
const testShapes = [rectangle, circle, triangle];

// ✅ ДЕМОНСТРАЦИЯ: Все функции-заменители работают одинаково
// 💡 baseDemo: {processorName, results, totalArea, totalPerimeter} для processShape
const baseDemo = demonstrateFunctionSubstitution(processShape, testShapes);
// 💡 flexibleDemo: тот же формат, демонстрирует взаимозаменяемость
const flexibleDemo = demonstrateFunctionSubstitution(
  processShapeFlexible,
  testShapes
);
// 💡 detailedDemo: расширенный формат с дополнительными полями (ковариантность)
const detailedDemo = demonstrateFunctionSubstitution(
  processShapeDetailed,
  testShapes
);

export {};
