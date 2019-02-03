import Modal from './modal';

$(function() {
  const modal = new Modal();

  // -------------------------------------------------------------
  // modal
  modal.$openTrigger.on('click', function(e) {
    e.preventDefault();
    const id = modal.getId($(this));

    modal.open(id);
  });

  modal.$closeTrigger.on('click', function(e) {
    e.preventDefault();
    const id = modal.getId($(this));

    modal.close(id);
  });
});
