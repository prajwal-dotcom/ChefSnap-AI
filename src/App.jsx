import { useState, useCallback, useRef } from 'react';

/* ── Data ── */
import { FOOD_INGREDIENTS } from './data/ingredients';
import { RECIPES } from './data/recipes';

/* ── Shared Components ── */
import AmbientBackground from './components/AmbientBackground';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import SubstitutionModal from './components/SubstitutionModal';

/* ── Views ── */
import CaptureScreen from './views/CaptureScreen';
import DetectionScreen from './views/DetectionScreen';
import RecipeGrid from './views/RecipeGrid';
import StepByStepGuide from './views/StepByStepGuide';

/**
 * App — Central state router for the ChefSnap AI pipeline.
 *
 * Screens:
 *   0 → CaptureScreen    (Upload & Simulate)
 *   1 → DetectionScreen   (YOLOv8 Results)
 *   2 → RecipeGrid        (Category-Filtered Recipes)
 *   3 → StepByStepGuide   (Cooking Walkthrough)
 */

export default function App() {
  // ─── Navigation ───
  const [currentScreen, setCurrentScreen] = useState(0);

  // ─── Upload State ───
  const [uploadMode, setUploadMode] = useState(null);      // 'food' | 'nonfood' | 'custom'
  const [previewSrc, setPreviewSrc] = useState(null);       // data-URL
  const [isProcessing, setIsProcessing] = useState(false);

  // ─── Detection State ───
  const [detectedIngredients, setDetectedIngredients] = useState([]);

  // ─── Recipe State ───
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // ─── Toasts ───
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  // ─── Substitution Modal ───
  const [subModal, setSubModal] = useState({ isOpen: false, ingredientName: null });

  // ═══════════════════════════════════════════
  //  HELPERS
  // ═══════════════════════════════════════════

  const showToast = useCallback((message, color = 'brand') => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev, { id, message, color }]);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const goToScreen = useCallback((index) => {
    setCurrentScreen(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const canNavigate = useCallback(
    (index) => {
      if (index === 0) return true;
      if (index === 1 && uploadMode !== null) return true;
      if (index >= 2 && detectedIngredients.length > 0) return true;
      if (index === 3 && selectedRecipe !== null) return true;
      return false;
    },
    [uploadMode, detectedIngredients, selectedRecipe],
  );

  // ═══════════════════════════════════════════
  //  SCREEN 0 ACTIONS
  // ═══════════════════════════════════════════

  const handleFileSelect = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewSrc(e.target.result);
      setUploadMode('custom');
    };
    reader.readAsDataURL(file);
  }, []);

  const handleSimulateFood = useCallback(() => {
    setUploadMode('food');
    setPreviewSrc(null);
    showToast('🥗 Food image loaded — Ready to analyze', 'brand');
  }, [showToast]);

  const handleSimulateNonFood = useCallback(() => {
    setUploadMode('nonfood');
    setPreviewSrc(null);
    showToast('🔌 Non-food test image loaded — Ready to analyze', 'red');
  }, [showToast]);

  const handleStartDetection = useCallback(() => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (uploadMode === 'nonfood') {
        setDetectedIngredients([]);
      } else {
        setDetectedIngredients([...FOOD_INGREDIENTS]);
      }
      goToScreen(1);
    }, 1800);
  }, [uploadMode, goToScreen]);

  // ═══════════════════════════════════════════
  //  SCREEN 2 → 3 ACTIONS
  // ═══════════════════════════════════════════

  const handleSelectRecipe = useCallback(
    (recipeId) => {
      const recipe = RECIPES.find((r) => r.id === recipeId);
      if (recipe) {
        setSelectedRecipe(recipe);
        goToScreen(3);
      }
    },
    [goToScreen],
  );

  // ═══════════════════════════════════════════
  //  SUBSTITUTION MODAL
  // ═══════════════════════════════════════════

  const openSubstitution = useCallback((ingredientName) => {
    setSubModal({ isOpen: true, ingredientName });
  }, []);

  const closeSubstitution = useCallback(() => {
    setSubModal({ isOpen: false, ingredientName: null });
  }, []);

  // ═══════════════════════════════════════════
  //  RENDER
  // ═══════════════════════════════════════════

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <AmbientBackground />

      <Navbar
        currentScreen={currentScreen}
        onNavigate={goToScreen}
        canNavigate={canNavigate}
      />

      <main className="flex-1 relative z-10 pt-24 pb-20">
        {currentScreen === 0 && (
          <CaptureScreen
            uploadMode={uploadMode}
            previewSrc={previewSrc}
            isProcessing={isProcessing}
            onFileSelect={handleFileSelect}
            onSimulateFood={handleSimulateFood}
            onSimulateNonFood={handleSimulateNonFood}
            onStartDetection={handleStartDetection}
          />
        )}

        {currentScreen === 1 && (
          <DetectionScreen
            uploadMode={uploadMode}
            detectedIngredients={detectedIngredients}
            onBack={() => goToScreen(0)}
            onProceed={() => goToScreen(2)}
            onOpenSubstitution={openSubstitution}
          />
        )}

        {currentScreen === 2 && (
          <RecipeGrid
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            onSelectRecipe={handleSelectRecipe}
            onBack={() => goToScreen(1)}
          />
        )}

        {currentScreen === 3 && selectedRecipe && (
          <StepByStepGuide
            recipe={selectedRecipe}
            onBack={() => goToScreen(2)}
            onOpenSubstitution={openSubstitution}
            showToast={showToast}
          />
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 mt-auto py-12 flex justify-center items-center">
        <p className="text-xs text-stone-400 font-light tracking-wide text-center">
          © 2026 ChefSnap AI. All rights reserved. Developed by Prajwal.
        </p>
      </footer>

      {/* ── Overlays ── */}
      <SubstitutionModal
        ingredientName={subModal.ingredientName}
        isOpen={subModal.isOpen}
        onClose={closeSubstitution}
        showToast={showToast}
      />

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
